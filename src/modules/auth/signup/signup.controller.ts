import { Request, Response } from "express";
import { SignupService } from "./signup.service";


const signupService = new SignupService();


export class SignupController {


  async signUp(req: Request, res: Response) {
    try {
      const { email, phoneNumber, password } = req.body;

      const {user, token} = await signupService.signUp(
        email,
        phoneNumber,
        password
      );

      const { password: hashedPassword, ...userWithoutPassword } = user;
      return res.status(201).json({
        message: "ثبت‌نام با موفقیت انجام شد",
          user: userWithoutPassword,
          token
      });

    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }


  async addName(req: Request, res: Response) {
    try {
      const { id, firstName, lastName } = req.body;

      const user = await signupService.addName(
        Number(id),
        firstName,
        lastName
      );

      return res.status(200).json({
        message: "اطلاعات با موفقیت ثبت شد",
        user,
      });

    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  
}