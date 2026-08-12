import { Router } from "express";
import { ForgotPasswordController } from "./forgotPassword.controller";

const router = Router();

const forgotPasswordController = new ForgotPasswordController();

router.post("/forgot-password", (req, res) =>
  forgotPasswordController.forgotPassword(req, res)
);

router.post("/reset-password", (req, res) =>
  forgotPasswordController.resetPassword(req, res)
);

export default router;