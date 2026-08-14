import { Router } from "express";
import GoalController from "./goal.controller";

const router = Router();
const goalController = new GoalController();

router.post("/", (req, res) => goalController.create(req, res));
router.get("/", (req, res) => goalController.getAll(req, res));
router.put("/:id", (req, res) => goalController.update(req, res));
router.delete("/:id", (req, res) => goalController.delete(req, res));

export default router;