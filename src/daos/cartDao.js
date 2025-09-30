import cart from "./models/cart.js";
import MongoDao from "./mongoDao.js";

class CartDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  getById = async (cid) => {
    return await this.model.findById(cid).populate("products.product");
  };

  create = async () =>{
    return await this.model.create({ products: [] });
  }

  save = async (cart)=> {
    return await cart.save();
  }
}

export const cartDao = new CartDao(cart);
