import express, { Router } from "express";
const router = Router();

import cart from "./cart.js";


router.get("/current", (req, res) => res.json({ user: req.user }));
router.use("/carts", cart);

export default router;
