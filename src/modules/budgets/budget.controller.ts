import { Request, Response } from "express";
import BudgetService from "./budget.service";

const budgetService = new BudgetService();

export class BudgetController {
  async create(req: Request, res: Response) {
    try {
      const budget = await budgetService.create({
        userId: Number(req.body.userId),
        categoryId: Number(req.body.categoryId),
        amount: Number(req.body.amount),
      });

      return res.status(201).json({ budget });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const filters = {
        search: req.query.search as string | undefined,

        categoryId: req.query.categoryId
          ? Number(req.query.categoryId)
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

      const budgets = await budgetService.getAll(
        Number(req.body.userId),
        filters
      );

      return res.status(200).json({ budgets });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const budget = await budgetService.getOne(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({ budget });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await budgetService.update(
        Number(req.body.userId),
        Number(req.params.id),
        {
          categoryId:
            req.body.categoryId !== undefined
              ? Number(req.body.categoryId)
              : undefined,

          amount:
            req.body.amount !== undefined
              ? Number(req.body.amount)
              : undefined,
        }
      );

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await budgetService.delete(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "بودجه حذف شد",
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }
}

export default BudgetController;