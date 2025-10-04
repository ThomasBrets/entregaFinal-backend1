import { ProductModel } from "./models/product.js";
import MongoDao from "./mongoDao.js";

class ProductDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  getAllProducts = async (limit) => {
    return await this.model.find().limit(limit);
  };

  getById = async (cid) => {
    return await this.model.findById(cid)
  };

  save = async (cart) => {
    return await cart.save();
  };
}

export const productDao = new ProductDao(ProductModel);
