import { cartService } from "../services/cartService.js";

class CartController {
  constructor(service) {
    this.service = service;
  }
  getCart = async (req, res, next) => {
    try {
      const cart = await this.service.getCart(req.params.cid);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const cart = await this.service.createCart();
      console.log("CONTROLLERCART", cart);

      res.status(201).json({ message: "Carrito creado", cart });
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req, res, next) => {
    try {
      const cart = await this.service.addProduct(
        req.params.cid,
        req.params.pid,
        req.body.quantity
      );
      res.json({ message: "Producto agregado al carrito", cart });
    } catch (error) {
      next(error);
    }
  };

  updateProductQuantity = async (req, res, next) => {
    try {
      const cart = await this.service.updateProductQuantity(
        req.params.cid,
        req.params.pid,
        req.body.quantity
      );
      res.json({ message: "Cantidad actualizada", cart });
    } catch (error) {
      next(error);
    }
  };

  removeProduct = async (req, res, next) => {
    try {
      const cart = await this.service.removeProduct(
        req.params.cid,
        req.params.pid
      );
      res.json({ message: "Producto eliminado", cart });
    } catch (error) {
      next(error);
    }
  };


    replaceProducts = async (req, res, next) => {
    try {
      const cart = await this.service.replaceProducts(
        req.params.cid,
        req.body.products
      );
      res.json({ message: "Carrito actualizado", cart });
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const cart = await this.service.clearCart(req.params.cid);
      res.json({ message: "Carrito vaciado", cart });
    } catch (error) {
      next(error);
    }
  };


}

export const cartController = new CartController(cartService);
