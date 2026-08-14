import { prisma } from "../../../prisma/prisma";

export class GoalsService {
  async create(data: {
    userId: number;
    title: string;
    targetAmount: number;
    currentAmount?: number;
    deadline?: string;
  }) {
    return prisma.goal.create({
      data: {
        userId: data.userId,
        title: data.title,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount ?? 0,
        deadline: data.deadline
          ? new Date(data.deadline)
          : undefined,
      },
    });
  }

  async getAll(
    userId: number,
    filters?: {
      search?: string;
      sortBy?: "targetAmount" | "currentAmount" | "createdAt";
      order?: "asc" | "desc";
      deadline?: "upcoming" | "passed";
    }
  ) {
    return prisma.goal.findMany({
      where: {
        userId,

        ...(filters?.search && {
          title: {
            contains: filters.search,
            mode: "insensitive",
          },
        }),

        ...(filters?.deadline === "upcoming" && {
          deadline: {
            gte: new Date(),
          },
        }),

        ...(filters?.deadline === "passed" && {
          deadline: {
            lt: new Date(),
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
    return prisma.goal.findFirst({
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
        ...(data.title !== undefined && {
          title: data.title,
        }),

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

export default GoalsService;