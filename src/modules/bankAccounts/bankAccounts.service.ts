import { prisma } from "../../../prisma/prisma";


export class BankAccountsService {


    async getBankAccounts(userId: number) {
        return await prisma.bankAccount.findMany({
        where: {
            userId,
        },
        });
    }

    async getBankAccountById(id: number, userId: number) {
        const account = await prisma.bankAccount.findFirst({
        where: {
            id,
            userId,
        },
        });

        if (!account) {
        throw new Error("حساب بانکی پیدا نشد");
        }

        return account;
    }


    async createBankAccount(
        userId: number,
        bankName: string,
        cardNumber: string,
        balance: number
    ) {
        return await prisma.bankAccount.create({
        data: {
            userId,
            bankName,
            cardNumber,
            balance,
        },
        });
    }


    async updateBankAccount(
        id: number,
        userId: number,
        bankName?: string,
        cardNumber?: string,
        balance?: number
    ) {
        const account = await this.getBankAccountById(id, userId);

        return await prisma.bankAccount.update({
        where: {
            id: account.id,
        },
        data: {
            bankName,
            cardNumber,
            balance,
        },
        });
    }

    
    async deleteBankAccount(id: number, userId: number) {
        const account = await this.getBankAccountById(id, userId);

        await prisma.bankAccount.delete({
        where: {
            id: account.id,
        },
        });

        return true;
    }


}

export default BankAccountsService;