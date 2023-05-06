import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private customerMsg: MatSnackBar) { }

  addToCart(product: Product) {
    const cart = this.getCartFromLocalStorage();
    cart.push(product);
    cart.sort(this.compareProducts);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.customerMsg.open(product.name + ' added to cart', 'Dismiss', {
      duration: 2000
    });
  }

  removeFromCart(product: Product) {
    const cart = this.getCartFromLocalStorage();
    const index = cart.findIndex(x => x.pkey === product.pkey);
    cart.splice(index, 1);
    cart.sort(this.compareProducts);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.customerMsg.open(product.name + ' removed from cart', 'Dismiss', {
      duration: 2000
    });
  }

  getCartCount() {
    return this.getCartFromLocalStorage().length;
  }

  getCart() {
    const c = localStorage.getItem('cart');
    if (c != null) {
      return JSON.parse(c);
    }
  }

  getCartTotal() {
    let total = 0;
    this.getCartFromLocalStorage().forEach(element => {
      total += element.price;
      if (element.sale) {
        total -= element.price * element.sale / 100;
      }
    });
    return total;
  }

  private getCartFromLocalStorage(): Product[] {
    let cart: Product[] = [];
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      cart = JSON.parse(cartString);
    }
    return cart;
  }

  private compareProducts(a: Product, b: Product): number {
    return a.name.localeCompare(b.name);
  }
}
