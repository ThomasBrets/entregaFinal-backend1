import express, { Router } from "express";
const router = Router()
import CartSchema from "../models/cart.js"


router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartSchema.findById(cid).populate("products.product");
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const newCart = await CartSchema.create({ products: [] });
    res.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  console.log("BODY", req.body);
  

  try {
    const cart = await CartSchema.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const productInCart = cart.products.find(
      (item) => item.product.toString() === pid
    );

    if (productInCart) {
      productInCart.quantity = quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    res.json({ message: "Cantidad actualizada", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await CartSchema.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    await cart.save();

    res.json({ message: "Producto eliminado del carrito", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body; 

  try {
    const cart = await CartSchema.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = products; 
    await cart.save();

    res.json({ message: "Carrito actualizado con nuevos productos", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartSchema.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = []; 
    await cart.save();

    res.json({ message: "Carrito vaciado correctamente", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartSchema.findById(cid);
    if (!cart) return res.status(404).send("Carrito no encontrado");

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += parseInt(quantity);
    } else {
      cart.products.push({ product: pid, quantity: parseInt(quantity) });
    }

    await cart.save();

    
    res.redirect(`/cart/${cid}`);
  } catch (error) {
    res.status(500).send("Error al agregar producto al carrito");
  }
});





export default router;
