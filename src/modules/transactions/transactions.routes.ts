import { Router } from "express";
import TransactionController from "./transactions.controller";

const router = Router();
const transactionController = new TransactionController();

router.post("/", (req, res) =>
  transactionController.create(req, res)
);

router.get("/", (req, res) =>
  transactionController.getAll(req, res)
);

router.get("/:id", (req, res) =>
  transactionController.getOne(req, res)
);

router.put("/:id", (req, res) =>
  transactionController.update(req, res)
);

router.delete("/:id", (req, res) =>
  transactionController.delete(req, res)
);

export default router;