import { cartRepository } from "../repositories/cartRepository.js"
import CustomError from "../utils/custom-error.js";

class CartService {
    constructor(repository) {
        this.repository = repository
    }
  getCart = async (cid) => {
    const cart = await this.repository.getCartById(cid);
    if (!cart) throw new CustomError("Carrito no encontrado", 404);
    return cart;
  };

  createCart = async () => await this.repository.createCart();

  addProduct = async (cid, pid, quantity) => {
    const cart = await this.getCart(cid);
    const productInCart = cart.products.find((item) => item.product.toString() === pid);

    if (productInCart) {
      productInCart.quantity += parseInt(quantity);
    } else {
      cart.products.push({ product: pid, quantity: parseInt(quantity) });
    }

    await this.repository.saveCart(cart);
    return cart;
  };

  updateProductQuantity = async (cid, pid, quantity) => {
    const cart = await this.getCart(cid);
    const productInCart = cart.products.find((item) => item.product.toString() === pid);
    if (!productInCart) throw new CustomError("Producto no encontrado en el carrito", 404);

    productInCart.quantity = quantity;
    await this.repository.saveCart(cart);
    return cart;
  };

  removeProduct = async (cid, pid) => {
    const cart = await this.getCart(cid);
    cart.products = cart.products.filter((item) => item.product.toString() !== pid);
    await this.repository.saveCart(cart);
    return cart;
  };

  clearCart = async (cid) => {
    const cart = await this.getCart(cid);
    cart.products = [];
    await this.repository.saveCart(cart);
    return cart;
  };

  replaceProducts = async (cid, products) => {
    const cart = await this.getCart(cid);
    cart.products = products;
    await this.repository.saveCart(cart);
    return cart;
  };

}

export const cartService = new CartService(cartRepository)