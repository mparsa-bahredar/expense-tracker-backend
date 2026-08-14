import { prisma } from "../../../prisma/prisma";

export class ReportService {
  async getTransactions(
    userId: number,
    filters?: {
      startDate?: string;
      endDate?: string;
      type?: "INCOME" | "EXPENSE";
      categoryId?: number;
      bankAccountId?: number;
      walletId?: number;
      sortBy?: "amount" | "createdAt";
      order?: "asc" | "desc";
    }
  ) {
    return prisma.transaction.findMany({
      where: {
        userId,

        ...(filters?.startDate || filters?.endDate
          ? {
              createdAt: {
                ...(filters.startDate && {
                  gte: new Date(filters.startDate),
                }),

                ...(filters.endDate && {
                  lte: new Date(filters.endDate),
                }),
              },
            }
          : {}),

        ...(filters?.type && {
          type: filters.type,
        }),

        ...(filters?.categoryId && {
          categoryId: filters.categoryId,
        }),

        ...(filters?.bankAccountId && {
          bankAccountId: filters.bankAccountId,
        }),

        ...(filters?.walletId && {
          walletId: filters.walletId,
        }),
      },

      orderBy: {
        [filters?.sortBy || "createdAt"]:
          filters?.order || "desc",
      },

      include: {
        category: true,
        bankAccount: true,
        wallet: true,
      },
    });
  }
}

export default ReportService;