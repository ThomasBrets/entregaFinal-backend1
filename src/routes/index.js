import express, { Router } from "express";
const router = Router();
import { userController } from "../controllers/userController.js";
import { passportCall } from "../middlewares/passport/passport-call.js";
import { verifyToken } from "../middlewares/verify-token.js";

import cart from "./cart.js";
import product from "./product.js";

router.use("/carts", cart);
router.use("/products", product);

router.use("/register", userController.register);
router.use("/login", userController.login);
router.use(
  "/current",
  passportCall("jwt", { session: false }),
  verifyToken,
  (req, res) => res.json({user:req.user})
);

export default router;
