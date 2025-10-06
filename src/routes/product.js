import { Router } from "express";
const router = Router();
import { productController } from "../controllers/productController.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { passportCall } from "../middlewares/passport/passport-call.js";

import admin from "./admin.js";

router.get("/", productController.getAll);
router.get("/:pid", productController.getById);

//! Admin
router.use(
  "/admin",
  passportCall("jwt", { session: false }),
  verifyRole("ADMIN"),
  admin
);

export default router;
