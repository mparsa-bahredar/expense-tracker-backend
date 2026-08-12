import { Request, Response } from "express";
import WalletService from "./wallet.service";


const walletService = new WalletService();


export class WalletController {


    async getWallet(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const wallet = await walletService.getWallet(Number(userId));
            return res.status(200).json({ wallet });
        } 
        catch (error) {
        return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }

    
    async createWallet(req: Request, res: Response) {
        try {
            const { userId, balance } = req.body;
            const wallet = await walletService.createWallet(Number(userId), Number(balance ?? 0));
            return res.status(201).json({ message: "کیف پول با موفقیت ایجاد شد", wallet });
        } 
        catch (error) {
        return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


    async updateWallet(req: Request, res: Response) {
        try {
            const { userId, balance } = req.body;
            const wallet = await walletService.updateWallet(Number(userId), Number(balance));
            return res.status(200).json({ message: "موجودی کیف پول با موفقیت تغییر کرد", wallet });
        } 
        catch (error) {
        return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


}

export default WalletController;