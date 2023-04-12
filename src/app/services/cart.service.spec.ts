import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const mockProduct1 = {
    pkey: 'test1',
    price: 999,
    name: 'Trifox X10',
    type: 'frame',
    attributes: { size: "S", length: 48 },
  }

  const mockProduct2 = {
    pkey: 'test2',
    price: 999,
    name: 'Trifox X10',
    type: 'frame',
    attributes: { size: "S", length: 48 },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    service.addToCart(mockProduct1);
    expect(service.getCartCount()).toEqual(1);
    expect(service.getCart()[0]).toEqual(mockProduct1);
    localStorage.clear();
  });

  it('should remove product from cart', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    service.removeFromCart(mockProduct1);
    expect(service.getCartCount()).toEqual(1);
    expect(service.getCart()[0]).toEqual(mockProduct2);
    localStorage.clear();
  });

  it('should return cart total', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    expect(service.getCartTotal()).toEqual(mockProduct1.price + mockProduct2.price);
    localStorage.clear();
  });
});