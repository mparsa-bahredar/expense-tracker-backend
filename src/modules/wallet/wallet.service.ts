import { prisma } from "../../../prisma/prisma";



export class WalletService {


    async getWallet(userId: number) {
        return await prisma.wallet.findUnique({ where: { userId } });
    }

    async createWallet(userId: number, balance: number = 0) {
        return await prisma.wallet.create({ data: { userId, balance } });
    }

    async updateWallet(userId: number, balance: number) {
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("کیف پول پیدا نشد");
        return await prisma.wallet.update({ where: { userId }, data: { balance } });
    }


}

export default WalletService;