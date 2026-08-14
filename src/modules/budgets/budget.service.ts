import { prisma } from "../../../prisma/prisma";

export class BudgetService {
  async create(data: {
    userId: number;
    categoryId: number;
    amount: number;
  }) {
    return prisma.budget.create({
      data: {
        userId: data.userId,
        categoryId: data.categoryId,
        amount: data.amount,
      },
      include: {
        category: true,
      },
    });
  }

  async getAll(
    userId: number,
    filters?: {
      search?: string;
      categoryId?: number;
      sortBy?: "amount" | "createdAt";
      order?: "asc" | "desc";
    }
  ) {
    return prisma.budget.findMany({
      where: {
        userId,

        ...(filters?.categoryId && {
          categoryId: filters.categoryId,
        }),

        ...(filters?.search && {
          category: {
            name: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
        }),
      },

      orderBy: {
        [filters?.sortBy || "createdAt"]:
          filters?.order || "desc",
      },

      include: {
        category: true,
      },
    });
  }

  async getOne(userId: number, id: number) {
    return prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async update(
    userId: number,
    id: number,
    data: {
      categoryId?: number;
      amount?: number;
    }
  ) {
    return prisma.budget.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...(data.categoryId !== undefined && {
          categoryId: data.categoryId,
        }),

        ...(data.amount !== undefined && {
          amount: data.amount,
        }),
      },
    });
  }

  async delete(userId: number, id: number) {
    return prisma.budget.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}

export default BudgetService;