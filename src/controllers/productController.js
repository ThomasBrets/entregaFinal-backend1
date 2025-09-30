import { productService } from "../services/productService.js";

class ProductController {
    constructor(service) {
        this.service = service
    }
 getAll = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const products = await this.service.getAll(limit);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.service.getById(pid);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const newProduct = await this.service.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProduct = await this.service.update(pid, req.body);
      if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await this.service.delete(pid);
      if (!deletedProduct) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export const productController = new ProductController(productService)