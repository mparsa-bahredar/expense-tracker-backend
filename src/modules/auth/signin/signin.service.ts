import { prisma } from "../../../../prisma/prisma";
import bcrypt from "bcrypt"
import JWTService from "../../jwt/jwt.service";


const jwtService = new JWTService();


class SigninService{


    async findUserByEmailOrPhone(email: string | null, phoneNumber: string | null) {
        const user = await prisma.user.findFirst({
            where: {
            OR: [
                { email },
                { phoneNumber },
            ],
            },
        });
        if (!user) {throw new Error("کاربر پیدا نشد");}
        return user;
    }


    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }


    async login(email: string | null, phoneNumber: string | null, password: string) {
        if (!email && !phoneNumber) {
            throw new Error("ایمیل یا شماره موبایل الزامی است");
        }
        const user = await this.findUserByEmailOrPhone(email, phoneNumber);
        const isPasswordCorrect = await this.comparePassword(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            throw new Error("رمز عبور اشتباه است");
        }
        const token = jwtService.generateToken(user.id);
        return {user,token};
    }


}

export default SigninService