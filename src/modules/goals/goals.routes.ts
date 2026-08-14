import { Router } from "express";
import GoalController from "./goals.controller";

const router = Router();
const goalController = new GoalController();

router.post("/", (req, res) =>
  goalController.create(req, res)
);

router.get("/", (req, res) =>
  goalController.getAll(req, res)
);

router.get("/:id", (req, res) =>
  goalController.getOne(req, res)
);

router.put("/:id", (req, res) =>
  goalController.update(req, res)
);

router.delete("/:id", (req, res) =>
  goalController.delete(req, res)
);

export default router;