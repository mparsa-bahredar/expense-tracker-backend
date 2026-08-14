import { Router } from "express";
import DashboardController from "./dashboard.controller";

const router = Router();

const dashboardController =
  new DashboardController();

router.get("/", (req, res) =>
  dashboardController.getDashboard(req, res)
);

export default router;