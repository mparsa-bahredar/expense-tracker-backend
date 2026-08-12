import { Request, Response } from "express";
import UsersService from "./users.service";


const usersService = new UsersService();


export class UsersController {


    async getUserById(req: Request, res: Response) {
        try {
        const { id } = req.params;

        const user = await usersService.getUserById(Number(id));

        return res.status(200).json({
            user,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


    async updateUser(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber } = req.body;

        const user = await usersService.updateUser(
            Number(id),
            firstName,
            lastName,
            email,
            phoneNumber
        );

        return res.status(200).json({
            message: "اطلاعات کاربر با موفقیت ویرایش شد",
            user,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


    async changePassword(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        await usersService.changePassword(
            Number(id),
            currentPassword,
            newPassword
        );

        return res.status(200).json({
            message: "رمز عبور با موفقیت تغییر کرد",
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


    async deleteUser(req: Request, res: Response) {
        try {
        const { id } = req.params;

        await usersService.deleteUser(Number(id));

        return res.status(200).json({
            message: "حساب کاربری با موفقیت حذف شد",
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


}

export default UsersController