import { prisma } from "../../../prisma/prisma";

export class GoalService {
  async create(userId: number, data: {
    title: string;
    targetAmount: number;
    deadline?: string;
  }) {
    return prisma.goal.create({
      data: {
        userId,
        title: data.title,
        targetAmount: data.targetAmount,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
    });
  }

  async getAll(userId: number) {
    return prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(
    userId: number,
    id: number,
    data: {
      title?: string;
      targetAmount?: number;
      currentAmount?: number;
      deadline?: string;
    }
  ) {
    return prisma.goal.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.targetAmount !== undefined && {
          targetAmount: data.targetAmount,
        }),
        ...(data.currentAmount !== undefined && {
          currentAmount: data.currentAmount,
        }),
        ...(data.deadline !== undefined && {
          deadline: new Date(data.deadline),
        }),
      },
    });
  }

  async delete(userId: number, id: number) {
    return prisma.goal.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}

export default GoalService;