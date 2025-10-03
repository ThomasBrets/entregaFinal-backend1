import { cartRepository } from "../repositories/cartRepository.js";
import CustomError from "../utils/custom-error.js";

class CartService {
  constructor(repository) {
    this.repository = repository;
  }
  getCart = async (cid) => {
    const cart = await this.repository.getCartById(cid);
    if (!cart) throw new CustomError("Carrito no encontrado", 404);
    return cart;
  };

  createCart = async () => {
    const cart = await this.repository.createCart();
    console.log("SERVICERCART", cart);
    return cart;
  };

  addProduct = async (cid, pid, quantity) => {
    const cart = await this.getCart(cid);
    const productInCart = cart.products.find((item) =>
      item.product.equals(pid)
    ); //ver si el producto ya está en el carrito (equals => compara el verdadero valor de objectID())

    if (productInCart) {
      productInCart.quantity += parseInt(quantity); // si ya está, sumo cantidad
    } else {
      cart.products.push({ product: pid, quantity: parseInt(quantity) }); // si no está, lo agrego al array
    }

    await this.repository.saveCart(cart); // guardo los cambios en la DB
    return cart; //Devolvemos el carrito actualizado
  };

  updateProductQuantity = async (cid, pid, quantity) => {
    const cart = await this.getCart(cid);
    const productInCart = cart.products.find((item) =>
      item.product.equals(pid)
    );
    if (!productInCart)
      throw new CustomError("Producto no encontrado en el carrito", 404);

    productInCart.quantity = quantity;
    await this.repository.saveCart(cart);
    return cart;
  };

  removeProduct = async (cid, pid) => {
    const cart = await this.getCart(cid);
    // Filtro todos los productos cuyo ID **no sea igual** al que queremos eliminar
    cart.products = cart.products.filter((item) => !item.product.equals(pid));
    await this.repository.saveCart(cart);
    return cart;
  };

  replaceProducts = async (cid, products) => {
    const cart = await this.getCart(cid);
    cart.products = products;
    await this.repository.saveCart(cart);
    return cart;
  };

  clearCart = async (cid) => {
    const cart = await this.getCart(cid);
    cart.products = [];
    await this.repository.saveCart(cart);
    return cart;
  };
}

export const cartService = new CartService(cartRepository);
