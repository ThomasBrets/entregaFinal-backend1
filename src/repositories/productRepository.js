import { productDao } from "../daos/productDao.js";

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async (limit) => {
    return await this.dao.getAllProducts(limit);
  };

  getById = async (id) => {
    const product = await this.dao.getById(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  };

  create = async (data) => {
    return await this.dao.createProduct(data);
  };

  update = async (id, data) => {
    const product = await this.dao.updateProduct(id, data);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  };

  delete = async (id) => {
    const product = await this.dao.deleteProduct(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return { message: "Producto eliminado con éxito" };
  };
}

export const productRepository = new ProductRepository(productDao);
