import { prisma } from "../../../prisma/prisma";
import bcrypt from "bcrypt";


export class UsersService {


    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
        where: {
            id,
        },
        });

        if (!user) {
        throw new Error("کاربر پیدا نشد");
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


    async updateUser(id: number, firstName?: string, lastName?: string, email?: string, phoneNumber?: string) {
        const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
        },
        });

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


    async changePassword(id: number, currentPassword: string, newPassword: string) {
        const user = await prisma.user.findUnique({
        where: {
            id,
        },
        });

        if (!user) {
        throw new Error("کاربر پیدا نشد");
        }

        const isCorrect = await bcrypt.compare(
        currentPassword,
        user.password
        );

        if (!isCorrect) {
        throw new Error("رمز عبور فعلی اشتباه است");
        }

        const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
        );

        if (isSamePassword) {
        throw new Error("رمز جدید نمی‌تواند با رمز قبلی یکسان باشد");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
        where: {
            id,
        },
        data: {
            password: hashedPassword,
        },
        });

        return true;
    }


    async deleteUser(id: number) {
        await prisma.user.delete({
        where: {
            id,
        },
        });

        return true;
    }


}

export default UsersService;