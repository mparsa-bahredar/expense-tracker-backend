import { Request, Response } from "express";
import CategoriesService from "./categories.service";


const categoriesService = new CategoriesService();


export class CategoriesController {


    async getCategories(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const categories = await categoriesService.getCategories(Number(userId));
            return res.status(200).json({ categories });
        } 
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }

    
    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const category = await categoriesService.getCategoryById(Number(id), Number(userId));
            return res.status(200).json({ category });
        } 
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


    async createCategory(req: Request, res: Response) {
        try {
            const { userId, name, type } = req.body;
            const category = await categoriesService.createCategory(Number(userId), name, type);
            return res.status(201).json({ message: "دسته‌بندی با موفقیت ایجاد شد", category });
        } 
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userId, name } = req.body;
            const category = await categoriesService.updateCategory(Number(id), Number(userId), name);
            return res.status(200).json({ message: "دسته‌بندی با موفقیت ویرایش شد", category });
        } 
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            await categoriesService.deleteCategory(Number(id), Number(userId));
            return res.status(200).json({ message: "دسته‌بندی با موفقیت حذف شد" });
        } 
        catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "خطایی رخ داد" });
        }
    }


}

export default CategoriesController;