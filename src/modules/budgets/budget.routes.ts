import { Router } from "express";
import BudgetController from "./budget.controller";

const router = Router();
const budgetController = new BudgetController();

router.post("/", (req, res) =>
  budgetController.create(req, res)
);

router.get("/", (req, res) =>
  budgetController.getAll(req, res)
);

router.put("/:id", (req, res) =>
  budgetController.update(req, res)
);

router.delete("/:id", (req, res) =>
  budgetController.delete(req, res)
);

export default router;