import { prisma } from "../../../prisma/prisma";



export class BankAccountService {

    async create(data: {
    userId: number;
    bankName: string;
    accountNumber?: string;
    cardNumber: string;
    balance: number;
    }) {
    return prisma.bankAccount.create({
        data: {
        userId: data.userId,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        cardNumber: data.cardNumber,
        balance: data.balance,
        },
    });
    }

    async getAll(
        userId: number,
        filters?: {
        search?: string;
        sortBy?: "balance" | "createdAt";
        order?: "asc" | "desc";
        }
    ) {
        return prisma.bankAccount.findMany({
        where: {
            userId,

            ...(filters?.search && {
            bankName: {
                contains: filters.search,
                mode: "insensitive",
            },
            }),
        },

        orderBy: {
            [filters?.sortBy || "createdAt"]:
            filters?.order || "desc",
        },
        });
    }

    async getOne(userId: number, id: number) {
        return prisma.bankAccount.findFirst({
        where: {
            id,
            userId,
        },
        });
    }

    async update(
        userId: number,
        id: number,
        data: {
        bankName?: string;
        accountNumber?: string;
        cardNumber?: string;
        balance?: number;
        }
    ) {
        return prisma.bankAccount.updateMany({
        where: {
            id,
            userId,
        },
        data: {
            ...(data.bankName !== undefined && {
            bankName: data.bankName,
            }),

            ...(data.accountNumber !== undefined && {
            accountNumber: data.accountNumber,
            }),

            ...(data.cardNumber !== undefined && {
            cardNumber: data.cardNumber,
            }),

            ...(data.balance !== undefined && {
            balance: data.balance,
            }),
        },
        });
    }

    async delete(userId: number, id: number) {
        return prisma.bankAccount.deleteMany({
        where: {
            id,
            userId,
        },
        });
    }
}

export default BankAccountService;