import { Router } from "express";
import CategoryController from "./categories.controller";

const router = Router();
const categoryController = new CategoryController();

router.post("/", (req, res) => categoryController.create(req, res));
router.get("/", (req, res) => categoryController.getAll(req, res));
router.get("/:id", (req, res) => categoryController.getOne(req, res));
router.put("/:id", (req, res) => categoryController.update(req, res));
router.delete("/:id", (req, res) => categoryController.delete(req, res));

export default router;