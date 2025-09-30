import express, { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:pid", productController.getById);
router.post("/", productController.create);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

export default router;

