import { Router } from "express";
import BankAccountsController from "./bankAccounts.controller";

const router = Router();

const bankAccountsController = new BankAccountsController();

router.get("/", (req, res) =>
  bankAccountsController.getBankAccounts(req, res)
);

router.get("/:id", (req, res) =>
  bankAccountsController.getBankAccountById(req, res)
);

router.post("/", (req, res) =>
  bankAccountsController.createBankAccount(req, res)
);

router.put("/:id", (req, res) =>
  bankAccountsController.updateBankAccount(req, res)
);

router.delete("/:id", (req, res) =>
  bankAccountsController.deleteBankAccount(req, res)
);

export default router;