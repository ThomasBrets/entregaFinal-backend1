import express from "express";
const router = express.Router();
import ProductSchema from "../daos/models/product.js";

// Mostrar todos los productos
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * limit;

    const products = await ProductSchema.find().skip(skip).limit(limit).lean();
    const totalProducts = await ProductSchema.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const cartId = "687c1c973dd0babf99319bc5";

    res.render("products", {
      products,
      cartId,
      pagination: {
        page,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
        prevPage: page - 1,
        nextPage: page + 1,
      },
    });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
});


router.get("/products/:pid", async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.pid).lean();
    if (!product) return res.status(404).send("Producto no encontrado");

    const cartId = "687c1c973dd0babf99319bc5"; 

    res.render("productDetail", { product, cartId });
  } catch (error) {
    res.status(500).send("Error al cargar el producto");
  }
});

import CartSchema from "../daos/models/cart.js";

router.get("/cart/:cid", async (req, res) => {
  try {
    const cart = await CartSchema.findById(req.params.cid)
      .populate("products.product")
      .lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", {
      cart,
      cartId: cart._id.toString(), 
    });
  } catch (error) {
    res.status(500).send("Error al cargar el carrito");
  }
});



export default router;
