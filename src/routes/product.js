import { Router } from "express";
const router = Router();
import { productController } from "../controllers/productController.js";
import { verifyRole } from "../middlewares/verifyRole.js";

import admin from "./admin.js";


router.get("/", productController.getAll);
router.get("/:pid", productController.getById);

//! Admin
router.use("/admin",verifyRole("admin"), admin);


export default router;

