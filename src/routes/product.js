import express, { Router } from "express";
const router = Router();
import ProductSchema from "../models/product.js";

router.get("/", async (req, res) => {
  try {
const limit = parseInt(req.query.limit) || 10

const product = await ProductSchema.find().limit(limit);
    console.log("productT", product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ProductSchema.findById(id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await ProductSchema.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ProductSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;

    const deletedProduct = await ProductSchema.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
export default router;

