import { prisma } from "../../../prisma/prisma";

export class BudgetService {
  async create(userId: number, categoryId: number, amount: number) {
    return prisma.budget.create({
      data: {
        userId,
        categoryId,
        amount,
      },
    });
  }

  async getAll(userId: number) {
    return prisma.budget.findMany({
      where: {
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
    amount: number
  ) {
    return prisma.budget.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        amount,
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