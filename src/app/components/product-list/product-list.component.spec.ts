import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { of } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Product } from 'src/app/interfaces/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;

  const mockProductList = {
    Items: [
      {
        pkey: 'frame-20230218141923',
        price: 999,
        name: 'Trifox X10',
        type: 'Frame',
      },
      {
        pkey: '2023-02-18T21:00:28.630Z',
        price: '1299',
        name: 'Trek 2022',
        type: 'Saddle',
      },
    ],
    Count: 2,
    ScannedCount: 2,
  };

  const mockShopData = {
    Items: [
      {
        key: 'ProductTypes',
        value: [{ "S": "Frame" }, { "S": "Handlebar" }, { "S": "Saddle" }, { "S": "Crankset" }]
      }
    ],
    Count: 1,
    ScannedCount: 1,
  }

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DynamodbService', ['getProducts', 'getShopData']);

    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, MatCardModule, MatIconModule, MatButtonToggleModule, BrowserAnimationsModule],
      declarations: [ProductListComponent, ProductCardComponent],
      providers: [HttpClient, HttpHandler, { provide: DynamodbService, useValue: spy }],
    }).compileComponents();

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getProducts = jasmine.createSpy().and.returnValue(of(mockProductList));
    dbServiceSpy.getShopData = jasmine.createSpy().and.returnValue(of(mockShopData));

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    TestBed.inject(DynamodbService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.products.length).toEqual(2);
  });

  it('should display only saddle products', () => {
    component.showType('Saddle');
    expect(component.displayProducts.length).toEqual(1);
    expect(component.displayProducts[0]).toEqual(<Product>mockProductList.Items[1]);
  });

  it('should display all products', () => {
    component.showAll();
    expect(component.displayProducts).toEqual(component.products);
  });

});
