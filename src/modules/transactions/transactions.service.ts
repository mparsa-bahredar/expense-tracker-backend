import { prisma } from "../../../prisma/prisma";

export class TransactionService {
    async create(data: {
        userId: number;
        amount: number;
        type: "INCOME" | "EXPENSE";
        description?: string;
        categoryId: number;
        accountId?: number;
    }) {
        return prisma.transaction.create({
        data: {
            userId: data.userId,
            amount: data.amount,
            type: data.type,
            description: data.description,
            categoryId: data.categoryId,
            accountId: data.accountId,
        },
        });
    }

    async getAll(
        userId: number,
        filters?: {
        type?: "INCOME" | "EXPENSE";
        categoryId?: number;
        accountId?: number;
        from?: string;
        to?: string;
        search?: string;
        sortBy?: "amount" | "createdAt";
        order?: "asc" | "desc";
        }
    ) {
        return prisma.transaction.findMany({
        where: {
            userId,

            ...(filters?.type && {
            type: filters.type,
            }),

            ...(filters?.categoryId && {
            categoryId: filters.categoryId,
            }),

            ...(filters?.accountId && {
            accountId: filters.accountId,
            }),

            ...(filters?.search && {
            description: {
                contains: filters.search,
                mode: "insensitive",
            },
            }),

            ...(filters?.from || filters?.to
            ? {
                createdAt: {
                    ...(filters.from && {
                    gte: new Date(filters.from),
                    }),

                    ...(filters.to && {
                    lte: new Date(filters.to),
                    }),
                },
                }
            : {}),
        },

        orderBy: {
            [filters?.sortBy || "createdAt"]:
            filters?.order || "desc",
        },

        include: {
            category: true,
            account: true,
        },
        });
    }

    async getOne(userId: number, id: number) {
        return prisma.transaction.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            category: true,
            account: true,
        },
        });
    }

    async update(
        userId: number,
        id: number,
        data: {
        amount?: number;
        type?: "INCOME" | "EXPENSE";
        description?: string;
        categoryId?: number;
        accountId?: number;
        }
    ) {
        return prisma.transaction.updateMany({
        where: {
            id,
            userId,
        },
        data: {
            ...(data.amount !== undefined && {
            amount: data.amount,
            }),

            ...(data.type !== undefined && {
            type: data.type,
            }),

            ...(data.description !== undefined && {
            description: data.description,
            }),

            ...(data.categoryId !== undefined && {
            categoryId: data.categoryId,
            }),

            ...(data.accountId !== undefined && {
            accountId: data.accountId,
            }),
        },
        });
    }

    async delete(userId: number, id: number) {
        return prisma.transaction.deleteMany({
        where: {
            id,
            userId,
        },
        });
    }
}

export default TransactionService;