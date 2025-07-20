import express, { Router } from "express";
const router = Router()

import cart from "./cart.js"
import product from "./product.js"


router.use("/carts", cart)
router.use("/products", product)





export default router;