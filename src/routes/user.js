import express, { Router } from "express";
const router = Router();

import cart from "./cart.js";
import UserDto from "../dtos/userDto.js";


router.get("/current", (req, res) => {
    const safeUser = new UserDto(req.user)
    res.json(safeUser)
});
router.use("/carts", cart);

export default router;
