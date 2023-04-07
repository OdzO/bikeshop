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
        type: 'frame',
      },
      {
        pkey: '2023-02-18T21:00:28.630Z',
        price: '1299',
        name: 'Trek 2022',
        type: 'frame',
      },
    ],
    Count: 2,
    ScannedCount: 2,
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DynamodbService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, MatCardModule, MatIconModule, BrowserAnimationsModule],
      declarations: [ProductListComponent, ProductCardComponent],
      providers: [HttpClient, HttpHandler, { provide: DynamodbService, useValue: spy }],
    }).compileComponents();

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getProducts = jasmine.createSpy().and.returnValue(of(mockProductList));
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    TestBed.inject(DynamodbService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.products.length).toEqual(2);
  });
});
