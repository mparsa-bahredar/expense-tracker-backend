import { Request, Response } from "express";
import ForgotPasswordService from "./forgotPassword.service";


const forgotPasswordService = new ForgotPasswordService();


export class ForgotPasswordController {


  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, phoneNumber } = req.body;

      const result = await forgotPasswordService.forgotPassword(
        email,
        phoneNumber
      );

      return res.status(200).json({
        message: "توکن بازیابی با موفقیت ایجاد شد",
        ...result,
      });

    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error
          ? error.message
          : "خطایی رخ داد",
      });
    }
  }


  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      await forgotPasswordService.resetPassword(
        token,
        newPassword
      );

      return res.status(200).json({
        message: "رمز عبور با موفقیت تغییر کرد",
      });

    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error
          ? error.message
          : "خطایی رخ داد",
      });
    }
  }

  
}