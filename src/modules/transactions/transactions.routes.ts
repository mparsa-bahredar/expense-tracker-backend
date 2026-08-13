import { Router } from "express";
import TransactionsController from "./transactions.controller";


const router = Router();
const transactionsController = new TransactionsController();


router.get("/", (req, res) =>
  transactionsController.getTransactions(req, res)
);

router.get("/:id", (req, res) =>
  transactionsController.getTransactionById(req, res)
);

router.post("/", (req, res) =>
  transactionsController.createTransaction(req, res)
);

router.delete("/:id", (req, res) =>
  transactionsController.deleteTransaction(req, res)
);


export default router;