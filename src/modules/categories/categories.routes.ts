import { Router } from "express";
import CategoriesController from "./categories.controller";


const router = Router();
const categoriesController = new CategoriesController();


router.get("/", (req, res) => categoriesController.getCategories(req, res));
router.get("/:id", (req, res) => categoriesController.getCategoryById(req, res));
router.post("/", (req, res) => categoriesController.createCategory(req, res));
router.put("/:id", (req, res) => categoriesController.updateCategory(req, res));
router.delete("/:id", (req, res) => categoriesController.deleteCategory(req, res));


export default router;