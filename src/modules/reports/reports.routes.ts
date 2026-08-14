import { Router } from "express";
import ReportController from "./reports.controller";

const router = Router();

const reportController =
  new ReportController();

router.get("/transactions", (req, res) =>
  reportController.getTransactions(req, res)
);

export default router;