import { Request, Response } from "express";
import TransactionService from "./transactions.service";

const transactionService = new TransactionService();

export class TransactionController {
    async create(req: Request, res: Response) {
        try {
        const transaction = await transactionService.create({
            userId: Number(req.body.userId),
            amount: Number(req.body.amount),
            type: req.body.type,
            description: req.body.description,
            categoryId: Number(req.body.categoryId),
            accountId: req.body.accountId
            ? Number(req.body.accountId)
            : undefined,
        });

        return res.status(201).json({ transaction });
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
        const userId = Number(req.body.userId);

        const filters = {
            type: req.query.type as
            | "INCOME"
            | "EXPENSE"
            | undefined,

            categoryId: req.query.categoryId
            ? Number(req.query.categoryId)
            : undefined,

            accountId: req.query.accountId
            ? Number(req.query.accountId)
            : undefined,

            from: req.query.from as string | undefined,

            to: req.query.to as string | undefined,

            search: req.query.search as string | undefined,

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
            await transactionService.getAll(
            userId,
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

    async getOne(req: Request, res: Response) {
        try {
        const transaction =
            await transactionService.getOne(
            Number(req.body.userId),
            Number(req.params.id)
            );

        return res.status(200).json({
            transaction,
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

    async update(req: Request, res: Response) {
        try {
        const result =
            await transactionService.update(
            Number(req.body.userId),
            Number(req.params.id),
            {
                amount:
                req.body.amount !== undefined
                    ? Number(req.body.amount)
                    : undefined,

                type: req.body.type,

                description: req.body.description,

                categoryId:
                req.body.categoryId !== undefined
                    ? Number(req.body.categoryId)
                    : undefined,

                accountId:
                req.body.accountId !== undefined
                    ? Number(req.body.accountId)
                    : undefined,
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
        await transactionService.delete(
            Number(req.body.userId),
            Number(req.params.id)
        );

        return res.status(200).json({
            message: "تراکنش حذف شد",
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

export default TransactionController;