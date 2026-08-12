import {prisma} from "../../../../prisma/prisma"
import bcrypt from "bcrypt"
import JWTService from "../../jwt/jwt.service";


const jwtService = new JWTService();


export class SignupService{


    async checkEmailExists(email: string) {
        const user = await prisma.user.findUnique({
        where: {
            email,
        },
        });
        if (user) {
        throw new Error('این ایمیل قبلاً ثبت شده است');
        }
        return false;
    }


    async checkPhoneExists(phoneNumber: string){
        const user = await prisma.user.findUnique({
            where:{
                phoneNumber,
            }
        });
        if (user) {
        throw new Error('این شماره موبایل قبلاً ثبت شده است');
        }
        return false;
    }


    async hashPassword(password: string){
        return await bcrypt.hash(password, 10); 
    }


    async createUser(email: string | null, phoneNumber: string | null, password: string) {
        const hashedPassword = await this.hashPassword(password);
        return await prisma.user.create({
            data:{
                email,
                phoneNumber,
                password: hashedPassword,
            },
        });
    }


    async signUp(email: string | null, phoneNumber: string | null, password: string){
        if (!email && !phoneNumber) {
            throw new Error("ایمیل یا شماره موبایل الزامی است");
        }        
        if(email){
            await this.checkEmailExists(email);
        }
        if (phoneNumber) {
            await this.checkPhoneExists(phoneNumber);
        }
        const user = await this.createUser(
            email,
            phoneNumber,
            password
        );
        const token = jwtService.generateToken(user.id);
        return {user, token};
    }


    async addName(id: number, firstName: string, lastName: string) {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
            },
        });
    }


}