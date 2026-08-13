import { Request, Response } from "express";
import TransactionsService from "./transactions.service";



const transactionsService = new TransactionsService();


export class TransactionsController {
  
  
    async getTransactions(req: Request, res: Response) {
        try {
        const { userId } = req.body;

        const transactions = await transactionsService.getTransactions(
            Number(userId)
        );

        return res.status(200).json({
            transactions,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async getTransactionById(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { userId } = req.body;

        const transaction = await transactionsService.getTransactionById(
            Number(id),
            Number(userId)
        );

        return res.status(200).json({
            transaction,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async createTransaction(req: Request, res: Response) {
        try {
        const {
            userId,
            categoryId,
            amount,
            type,
            description,
            bankAccountId,
            walletId,
        } = req.body;

        const transaction = await transactionsService.createTransaction(
            Number(userId),
            Number(categoryId),
            Number(amount),
            type,
            description,
            bankAccountId ? Number(bankAccountId) : undefined,
            walletId ? Number(walletId) : undefined
        );

        return res.status(201).json({
            message: "تراکنش با موفقیت ثبت شد",
            transaction,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { userId } = req.body;

        await transactionsService.deleteTransaction(
            Number(id),
            Number(userId)
        );

        return res.status(200).json({
            message: "تراکنش با موفقیت حذف شد",
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


}

export default TransactionsController;