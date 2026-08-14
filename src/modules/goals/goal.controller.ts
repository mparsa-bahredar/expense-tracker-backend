import { Request, Response } from "express";
import GoalService from "./goal.service";

const goalService = new GoalService();

export class GoalController {
  async create(req: Request, res: Response) {
    try {
      const { userId, title, targetAmount, deadline } = req.body;

      const goal = await goalService.create(Number(userId), {
        title,
        targetAmount: Number(targetAmount),
        deadline,
      });

      return res.status(201).json({ goal });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const goals = await goalService.getAll(Number(userId));

      return res.status(200).json({ goals });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId, title, targetAmount, currentAmount, deadline } = req.body;

      const result = await goalService.update(
        Number(userId),
        Number(req.params.id),
        {
          title,
          targetAmount: targetAmount !== undefined ? Number(targetAmount) : undefined,
          currentAmount: currentAmount !== undefined ? Number(currentAmount) : undefined,
          deadline,
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
      const { userId } = req.body;

      await goalService.delete(
        Number(userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "هدف حذف شد",
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }
}

export default GoalController;