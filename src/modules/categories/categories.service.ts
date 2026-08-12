import { prisma } from "../../../prisma/prisma";


export class CategoriesService {


    async getCategories(userId: number) {
        return await prisma.category.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    }

    async getCategoryById(id: number, userId: number) {
        const category = await prisma.category.findFirst({ where: { id, userId } });
        if (!category) throw new Error("دسته‌بندی پیدا نشد");
        return category;
    }

    async createCategory(userId: number, name: string, type: "INCOME" | "EXPENSE") {
        const existingCategory = await prisma.category.findFirst({ where: { userId, name, type } });
        if (existingCategory) throw new Error("این دسته‌بندی قبلاً وجود دارد");
        return await prisma.category.create({ data: { userId, name, type } });
    }

    async updateCategory(id: number, userId: number, name: string) {
        await this.getCategoryById(id, userId);
        return await prisma.category.update({ where: { id }, data: { name } });
    }

    async deleteCategory(id: number, userId: number) {
        await this.getCategoryById(id, userId);
        await prisma.category.delete({ where: { id } });
        return true;
    }


}

export default CategoriesService;