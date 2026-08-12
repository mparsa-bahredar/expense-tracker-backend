import { Router } from "express";
import UsersController from "./users.controller";

const router = Router();

const usersController = new UsersController();

router.get("/:id", (req, res) =>
  usersController.getUserById(req, res)
);

router.put("/:id", (req, res) =>
  usersController.updateUser(req, res)
);

router.put("/:id/change-password", (req, res) =>
  usersController.changePassword(req, res)
);

router.delete("/:id", (req, res) =>
  usersController.deleteUser(req, res)
);

export default router;