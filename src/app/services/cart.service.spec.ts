import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestObjects } from '../misc/TestObjects';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [MatSnackBar]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    service.addToCart(TestObjects.TestProduct1);
    expect(service.getCartCount()).toEqual(1);
    expect(service.getCart()[0]).toEqual(TestObjects.TestProduct1);
    localStorage.clear();
  });

  it('should remove product from cart', () => {
    service.addToCart(TestObjects.TestProduct1);
    service.addToCart(TestObjects.TestProduct2);
    service.removeFromCart(TestObjects.TestProduct1);
    expect(service.getCartCount()).toEqual(1);
    expect(service.getCart()[0]).toEqual(TestObjects.TestProduct2);
    localStorage.clear();
  });

  it('should return cart total', () => {
    service.addToCart(TestObjects.TestProduct1);
    service.addToCart(TestObjects.TestProductSale);
    expect(service.getCartTotal()).toEqual(1899);
    localStorage.clear();
  });
});
