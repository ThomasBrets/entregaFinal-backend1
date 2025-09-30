import { productRepository } from "../repositories/productRepository.js";
import CustomError from "../utils/custom-error.js";

class ProductService {
  constructor(repository) {
    this.repository = repository;
  }
  getAllProducts = async (limit) => {
    return await this.repository.getAll(limit);
  };

  getProductById = async (id) => {
    return await this.repository.getById(id);
  };

  createProduct = async (data) => {
    return await this.repository.create(data);
  };

  updateProduct = async (id, data) => {
    return await this.repository.update(id, data);
  };

  deleteProduct = async (id) => {
    return await this.repository.delete(id);
  };
}

export const productService = new ProductService(productRepository);
