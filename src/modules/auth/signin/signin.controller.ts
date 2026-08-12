import { Request, Response } from "express";
import SigninService from "./signin.service";

const signinService = new SigninService();

export class SigninController {

  async signIn(req: Request, res: Response) {
    try {
      const { email, phoneNumber, password } = req.body;

      const { user, token } = await signinService.login(
        email,
        phoneNumber,
        password
      );

      const { password: hashedPassword, ...userWithoutPassword } = user;

      return res.status(200).json({
        message: "ورود با موفقیت انجام شد",
        user: userWithoutPassword,
        token,
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