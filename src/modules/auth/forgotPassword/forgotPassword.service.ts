import { prisma } from "../../../../prisma/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";



class ForgotPasswordService {


    async findUserByEmailOrPhone(email: string | null, phoneNumber: string | null) {
        let user;
        if (email) {
            user = await prisma.user.findUnique({
                where: { email },
            });
        } else if (phoneNumber) {
            user = await prisma.user.findUnique({
                where: { phoneNumber },
            });
        }
        if (!user) {
            throw new Error("کاربر پیدا نشد");
        }
        return user;
    }


  async generateResetToken() {
    return crypto.randomBytes(32).toString("hex");
  }


  async saveResetToken(userId: number, token: string) {
    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    return await prisma.passwordResetToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }


  async verifyResetToken(token: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      throw new Error("توکن بازیابی نامعتبر است");
    }

    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });

      throw new Error("توکن بازیابی منقضی شده است");
    }

    return resetToken;
  }


  async hashNewPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }


  async resetPassword(token: string, newPassword: string) {
    const resetToken = await this.verifyResetToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: resetToken.userId,
      },
    });
    if (!user) {
      throw new Error("کاربر پیدا نشد");
    }
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSamePassword) {
      throw new Error("رمز جدید نمی‌تواند با رمز قبلی یکسان باشد");
    }
    const hashedPassword = await this.hashNewPassword(newPassword);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });
    return true;
  }


  async forgotPassword(email: string | null, phoneNumber: string | null) {
    if (!email && !phoneNumber) {
      throw new Error("ایمیل یا شماره موبایل الزامی است");
    }
    const user = await this.findUserByEmailOrPhone(email, phoneNumber);
    const token = await this.generateResetToken();
    await this.saveResetToken(user.id, token);
    return {token};
  }
}

export default ForgotPasswordService