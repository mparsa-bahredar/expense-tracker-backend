import { Router } from "express";
import BankAccountController from "./bankAccounts.controller";

const router = Router();
const bankAccountController = new BankAccountController();

router.post("/", (req, res) => bankAccountController.create(req, res));
router.get("/", (req, res) => bankAccountController.getAll(req, res));
router.get("/:id", (req, res) => bankAccountController.getOne(req, res));
router.put("/:id", (req, res) => bankAccountController.update(req, res));
router.delete("/:id", (req, res) => bankAccountController.delete(req, res));

export default router;