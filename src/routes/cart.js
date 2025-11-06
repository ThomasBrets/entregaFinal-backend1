import { Router } from "express";
const router = Router()
import { cartController } from "../controllers/cartController.js";


router.get("/:cid", cartController.getCart);
router.post("/", cartController.createCart);
router.post("/:cid/products/:pid", cartController.addProduct);
router.post("/:cid/purchase", cartController.purchaseCart)
router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.put("/:cid", cartController.replaceProducts);
router.delete("/:cid/products/:pid", cartController.removeProduct);
router.delete("/:cid", cartController.clearCart);




export default router;
