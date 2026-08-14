import { Router } from "express";
import ReportsController from "./reports.controller";

const router = Router();
const reportsController = new ReportsController();

router.get("/summary", (req, res) =>
  reportsController.getSummary(req, res)
);

router.get("/monthly", (req, res) =>
  reportsController.getMonthlyReport(req, res)
);

router.get("/categories", (req, res) =>
  reportsController.getCategoryReport(req, res)
);

export default router;