import { Request, Response } from "express";
import ReportsService from "./reports.service";

const reportsService = new ReportsService();

export class ReportsController {
  async getSummary(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const report = await reportsService.getSummary(
        Number(userId)
      );

      return res.status(200).json({ report });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async getMonthlyReport(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const report =
        await reportsService.getMonthlyReport(
          Number(userId)
        );

      return res.status(200).json({ report });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async getCategoryReport(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const report =
        await reportsService.getCategoryReport(
          Number(userId)
        );

      return res.status(200).json({ report });
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

export default ReportsController;