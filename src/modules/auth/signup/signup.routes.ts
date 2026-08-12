import { Router } from "express";
import { SignupController } from "./signup.controller";

const router = Router();

const signupController = new SignupController();

router.post("/signup", (req, res) =>
  signupController.signUp(req, res)
);

router.post("/signup/name", (req, res) =>
  signupController.addName(req, res)
);

export default router;