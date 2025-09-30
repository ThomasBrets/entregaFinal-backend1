import express, { Router } from "express";
const router = Router();
import { passportCall } from "../middlewares/passport/passport-call.js";

import product from "./product.js";
import user from "./user.js";
import admin from "./admin.js";
import auth from "./auth.js";

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", passportCall("jwt", { session: false }), user);
router.use("/admin", admin);

export default router;
