import { Request, Response } from "express";
import GoalService from "./goals.service";

const goalService = new GoalService();

export class GoalController {
  async create(req: Request, res: Response) {
    try {
      const goal = await goalService.create({
        userId: Number(req.body.userId),
        title: req.body.title,
        targetAmount: Number(req.body.targetAmount),
        currentAmount:
          req.body.currentAmount !== undefined
            ? Number(req.body.currentAmount)
            : undefined,
        deadline: req.body.deadline,
      });

      return res.status(201).json({ goal });
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
      const filters = {
        search: req.query.search as string | undefined,

        sortBy: req.query.sortBy as
          | "targetAmount"
          | "currentAmount"
          | "createdAt"
          | undefined,

        order: req.query.order as
          | "asc"
          | "desc"
          | undefined,

        deadline: req.query.deadline as
          | "upcoming"
          | "passed"
          | undefined,
      };

      const goals = await goalService.getAll(
        Number(req.body.userId),
        filters
      );

      return res.status(200).json({ goals });
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "خطایی رخ داد",
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const goal = await goalService.getOne(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({ goal });
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
      const result = await goalService.update(
        Number(req.body.userId),
        Number(req.params.id),
        {
          title: req.body.title,

          targetAmount:
            req.body.targetAmount !== undefined
              ? Number(req.body.targetAmount)
              : undefined,

          currentAmount:
            req.body.currentAmount !== undefined
              ? Number(req.body.currentAmount)
              : undefined,

          deadline: req.body.deadline,
        }
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
      await goalService.delete(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "هدف حذف شد",
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

export default GoalController;