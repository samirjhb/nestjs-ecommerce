import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dto/item.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<CartDocument>) { }

  //El primero es crear un nuevo carrito para el usuario actual:
  async createCart(userId: string, itemDTO: ItemDTO, subTotalPrice: number, totalPrice: number): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice
    });
    return newCart;
  }

  //Buscar el carito por id
  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });
    return cart;
  }

  //Eliminar el carito por id
  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId });
    return deletedCart;
  }

  //El siguiente método es volver a calcular el total del carrito cuando se añade o elimina un artículo, 
  // o cuando se cambia la cantidad de un artículo
  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.items.forEach(item => {
      cart.totalPrice += (item.quantity * item.price);
    })
  }

  //El siguiente método es añadir artículos al carrito:

  //*En el método anterior, si el carrito existe, hay dos opciones:
  // 1. El producto existe, por lo que necesitamos actualizar su cantidad y precio subtotal
  // 2. El producto no existe, así que tenemos que añadirlo
  //De cualquier manera, tenemos que ejecutar el método recalculateCart() para actualizar
  // el carrito adecuadamente. Si el carrito no existe, tenemos que crear uno nuevo.

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price } = itemDTO;
    const subTotalPrice = quantity * price;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.productId == productId);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      const newCart = await this.createCart(userId, itemDTO, subTotalPrice, price);
      return newCart;
    }
  }

  //El último método es eliminar un artículo del carrito:
  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.productId == productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      return cart.save();
    }
  }
  //De manera similar al método anterior, en el método anterior, ejecutamos recalculateCart() 
  // para actualizar el carrito correctamente después de eliminar un elemento.

}