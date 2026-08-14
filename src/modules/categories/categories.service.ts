import { prisma } from "../../../prisma/prisma";

export class CategoryService {
  async create(data: {
    userId: number;
    name: string;
  }) {
    return prisma.category.create({
      data: {
        userId: data.userId,
        name: data.name,
      },
    });
  }

  async getAll(
    userId: number,
    filters?: {
      search?: string;
      sortBy?: "name" | "createdAt";
      order?: "asc" | "desc";
    }
  ) {
    return prisma.category.findMany({
      where: {
        userId,

        ...(filters?.search && {
          name: {
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
    return prisma.category.findFirst({
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
      name?: string;
    }
  ) {
    return prisma.category.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name,
        }),
      },
    });
  }

  async delete(userId: number, id: number) {
    return prisma.category.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}

export default CategoryService;