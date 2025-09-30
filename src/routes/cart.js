import { Router } from "express";
const router = Router()
import { cartController } from "../controllers/cartController.js";


router.get("/:cid", cartController.getCart);
router.post("/", cartController.createCart);
router.post("/:cid/products/:pid", cartController.addProduct);
router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.delete("/:cid/products/:pid", cartController.removeProduct);
router.put("/:cid", cartController.replaceProducts);
router.delete("/:cid", cartController.clearCart);




export default router;
