import { Request, Response } from "express";
import BankAccountsService from "./bankAccounts.service";


const bankAccountsService = new BankAccountsService();


export class BankAccountsController {

    async getBankAccounts(req: Request, res: Response) {
        try {
        const { userId } = req.body;

        const accounts = await bankAccountsService.getBankAccounts(
            Number(userId)
        );

        return res.status(200).json({
            accounts,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async getBankAccountById(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { userId } = req.body;

        const account = await bankAccountsService.getBankAccountById(
            Number(id),
            Number(userId)
        );

        return res.status(200).json({
            account,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async createBankAccount(req: Request, res: Response) {
        try {
        const {
            userId,
            bankName,
            cardNumber,
            balance,
        } = req.body;

        const account = await bankAccountsService.createBankAccount(
            Number(userId),
            bankName,
            cardNumber,
            Number(balance)
        );

        return res.status(201).json({
            message: "حساب بانکی با موفقیت ایجاد شد",
            account,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async updateBankAccount(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const {
            userId,
            bankName,
            cardNumber,
            balance,
        } = req.body;

        const account = await bankAccountsService.updateBankAccount(
            Number(id),
            Number(userId),
            bankName,
            cardNumber,
            balance !== undefined ? Number(balance) : undefined
        );

        return res.status(200).json({
            message: "حساب بانکی با موفقیت ویرایش شد",
            account,
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }

    async deleteBankAccount(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { userId } = req.body;

        await bankAccountsService.deleteBankAccount(
            Number(id),
            Number(userId)
        );

        return res.status(200).json({
            message: "حساب بانکی با موفقیت حذف شد",
        });
        } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "خطایی رخ داد",
        });
        }
    }


}

export default BankAccountsController;