import { Router } from "express";
import { SigninController } from "./signin.controller";

const router = Router();

const signinController = new SigninController();

router.post("/signin", (req, res) =>
  signinController.signIn(req, res)
);

export default router;