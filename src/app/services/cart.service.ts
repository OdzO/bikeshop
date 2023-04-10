import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addToCart(product: Product){
    const cart = this.getCartFromLocalStorage();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(product: Product){
    const cart = this.getCartFromLocalStorage();
    const index = cart.findIndex(x => x.pkey === product.pkey);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCartCount(){
    return this.getCartFromLocalStorage().length;
  }

  getCart(){
    const c = localStorage.getItem('cart');
    if(c != null){
      return JSON.parse(c);
    }
  }

  getCartTotal(){
    let total = 0;
    this.getCartFromLocalStorage().forEach(element => {
      total += element.price;
    });
    return total;
  }

  private getCartFromLocalStorage(): Product[] {
    let cart: Product[] = [];
    const cartString = localStorage.getItem('cart');
    if(cartString){
      cart = JSON.parse(cartString);
    }
    return cart;
  }
}
