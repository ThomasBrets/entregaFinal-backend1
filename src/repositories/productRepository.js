import { productDao } from "../daos/productDao.js";
import CustomError from "../utils/custom-error.js";

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
    return await this.dao.create(data);
  };

  update = async (id, data) => {
    const product = await this.dao.update(id, data);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  };

  delete = async (id) => {
    const product = await this.dao.delete(id);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return { message: "Producto eliminado con éxito" };
  };
}

export const productRepository = new ProductRepository(productDao);
