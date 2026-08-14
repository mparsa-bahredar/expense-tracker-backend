import { Request, Response } from "express";
import DashboardService from "./dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const dashboard =
        await dashboardService.getDashboard(
          Number(userId)
        );

      return res.status(200).json({
        dashboard,
      });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }
}

export default DashboardController;