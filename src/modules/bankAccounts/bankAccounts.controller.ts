import { Request, Response } from "express";
import BankAccountService from "./bankAccounts.service";

const bankAccountService = new BankAccountService();

export class BankAccountController {
  async create(req: Request, res: Response) {
    try {
      const bankAccount = await bankAccountService.create({
        userId: Number(req.body.userId),
        bankName: req.body.bankName,
        accountNumber: req.body.accountNumber,
        cardNumber: req.body.cardNumber,
        balance: Number(req.body.balance || 0),
      });

      return res.status(201).json({ bankAccount });
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
          | "balance"
          | "createdAt"
          | undefined,
        order: req.query.order as "asc" | "desc" | undefined,
      };

      const bankAccounts = await bankAccountService.getAll(
        Number(req.body.userId),
        filters
      );

      return res.status(200).json({ bankAccounts });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const bankAccount = await bankAccountService.getOne(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({ bankAccount });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await bankAccountService.update(
        Number(req.body.userId),
        Number(req.params.id),
        {
          bankName: req.body.bankName,
          accountNumber: req.body.accountNumber,
          cardNumber: req.body.cardNumber,
          balance:
            req.body.balance !== undefined
              ? Number(req.body.balance)
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
      await bankAccountService.delete(
        Number(req.body.userId),
        Number(req.params.id)
      );

      return res.status(200).json({
        message: "حساب بانکی حذف شد",
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "خطایی رخ داد",
      });
    }
  }
}

export default BankAccountController;