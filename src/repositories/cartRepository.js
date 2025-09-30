import { cartDao } from "../daos/cartDao.js";

class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getCartById = async (cid) => await this.dao.getById(cid);

  createCart = async () => await this.dao.create();

  saveCart = async (cart) => await this.dao.save(cart);
}

export const cartRepository = new CartRepository(cartDao);
