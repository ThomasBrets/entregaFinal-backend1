import { productService } from "../services/productService.js";

class ProductController {
    constructor(service) {
        this.service = service
    }
 getAll = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const products = await this.service.getAllProducts(limit);
      res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  };

  getById = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await this.service.getProductById(pid);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  };

  create = async (req, res, next) => {
    try {
      const newProduct = await this.service.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error)
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const updatedProduct = await this.service.updateProduct(pid, req.body);
      if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error)
    }
  };

  delete = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await this.service.deleteProduct(pid);
      if (!deletedProduct) return res.status(404).json({ error: "Producto no encontrado" });
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      next(error)
    }
  };
}

export const productController = new ProductController(productService)