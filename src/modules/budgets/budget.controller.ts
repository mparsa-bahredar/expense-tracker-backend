import { Request, Response } from "express";
import BudgetService from "./budget.service";

const budgetService = new BudgetService();

export class BudgetController {
  async create(req: Request, res: Response) {
    try {
      const { userId, categoryId, amount } = req.body;

      const budget = await budgetService.create(
        Number(userId),
        Number(categoryId),
        Number(amount)
      );

      return res.status(201).json({ budget });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const budgets = await budgetService.getAll(
        Number(userId)
      );

      return res.status(200).json({ budgets });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId, amount } = req.body;

      const result = await budgetService.update(
        Number(userId),
        Number(req.params.id),
        Number(amount)
      );

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      await budgetService.delete(
        Number(userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "بودجه حذف شد",
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

export default BudgetController;