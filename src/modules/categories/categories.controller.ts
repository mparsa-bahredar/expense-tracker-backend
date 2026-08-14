import { Request, Response } from "express";
import CategoryService from "./categories.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create({
        userId: Number(req.body.userId),
        name: req.body.name,
      });

      return res.status(201).json({ category });
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

        sortBy: req.query.sortBy as
          | "name"
          | "createdAt"
          | undefined,

        order: req.query.order as
          | "asc"
          | "desc"
          | undefined,
      };

      const categories = await categoryService.getAll(
        Number(req.body.userId),
        filters
      );

      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const category = await categoryService.getOne(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({ category });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await categoryService.update(
        Number(req.body.userId),
        Number(req.params.id),
        {
          name: req.body.name,
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
      await categoryService.delete(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "دسته‌بندی حذف شد",
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }
}

export default CategoryController;