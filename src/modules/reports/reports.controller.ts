import { Request, Response } from "express";
import ReportService from "./reports.service";

const reportService = new ReportService();

export class ReportController {
  async getTransactions(req: Request, res: Response) {
    try {
      const filters = {
        startDate: req.query.startDate as string | undefined,

        endDate: req.query.endDate as string | undefined,

        type: req.query.type as
          | "INCOME"
          | "EXPENSE"
          | undefined,

        categoryId: req.query.categoryId
          ? Number(req.query.categoryId)
          : undefined,

        bankAccountId: req.query.bankAccountId
          ? Number(req.query.bankAccountId)
          : undefined,

        walletId: req.query.walletId
          ? Number(req.query.walletId)
          : undefined,

        sortBy: req.query.sortBy as
          | "amount"
          | "createdAt"
          | undefined,

        order: req.query.order as
          | "asc"
          | "desc"
          | undefined,
      };

      const transactions =
        await reportService.getTransactions(
          Number(req.body.userId),
          filters
        );

      return res.status(200).json({
        transactions,
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

export default ReportController;