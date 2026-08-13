import { prisma } from "../../../prisma/prisma";



export class TransactionsService {


    async getTransactions(userId: number) {
        return await prisma.transaction.findMany({
        where: { userId },
        include: {
            category: true,
            bankAccount: true,
            wallet: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        });
    }

    async getTransactionById(id: number, userId: number) {
        const transaction = await prisma.transaction.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            category: true,
            bankAccount: true,
            wallet: true,
        },
        });

        if (!transaction) {
        throw new Error("تراکنش پیدا نشد");
        }

        return transaction;
    }

    async createTransaction(
        userId: number,
        categoryId: number,
        amount: number,
        type: "INCOME" | "EXPENSE",
        description?: string,
        bankAccountId?: number,
        walletId?: number
    ) {
        if (!bankAccountId && !walletId) {
        throw new Error("حساب بانکی یا کیف پول الزامی است");
        }

        if (bankAccountId && walletId) {
        throw new Error("فقط یکی از حساب بانکی یا کیف پول را انتخاب کنید");
        }

        return await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.create({
            data: {
            userId,
            categoryId,
            amount,
            type,
            description,
            bankAccountId,
            walletId,
            },
        });

        const balanceChange = type === "INCOME" ? amount : -amount;

        if (bankAccountId) {
            const account = await tx.bankAccount.findFirst({
            where: {
                id: bankAccountId,
                userId,
            },
            });

            if (!account) {
            throw new Error("حساب بانکی پیدا نشد");
            }

            await tx.bankAccount.update({
            where: {
                id: bankAccountId,
            },
            data: {
                balance: {
                increment: balanceChange,
                },
            },
            });
        }

        if (walletId) {
            const wallet = await tx.wallet.findFirst({
            where: {
                id: walletId,
                userId,
            },
            });

            if (!wallet) {
            throw new Error("کیف پول پیدا نشد");
            }

            await tx.wallet.update({
            where: {
                id: walletId,
            },
            data: {
                balance: {
                increment: balanceChange,
                },
            },
            });
        }

        return transaction;
        });
    }

    async deleteTransaction(id: number, userId: number) {
        const transaction = await this.getTransactionById(id, userId);

        return await prisma.$transaction(async (tx) => {
        const balanceChange =
            transaction.type === "INCOME"
            ? -transaction.amount
            : transaction.amount;

        if (transaction.bankAccountId) {
            await tx.bankAccount.update({
            where: {
                id: transaction.bankAccountId,
            },
            data: {
                balance: {
                increment: balanceChange,
                },
            },
            });
        }

        if (transaction.walletId) {
            await tx.wallet.update({
            where: {
                id: transaction.walletId,
            },
            data: {
                balance: {
                increment: balanceChange,
                },
            },
            });
        }

        await tx.transaction.delete({
            where: {
            id,
            },
        });

        return true;
        });
    }


}

export default TransactionsService;