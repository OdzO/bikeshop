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
import { TestObjects } from 'src/app/misc/test-objects';
import { MatSelectModule } from '@angular/material/select';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;

  const mockProductList = {
    Items: [
      TestObjects.TestProduct1,
      TestObjects.TestProduct2
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
      imports: [MatSidenavModule, MatCardModule, MatIconModule, MatButtonToggleModule, MatSelectModule, MatButtonModule, MatSliderModule, BrowserAnimationsModule, FormsModule],
      declarations: [ProductListComponent, ProductCardComponent, ProductFilterComponent],
      providers: [HttpClient, HttpHandler, MatSnackBar, { provide: DynamodbService, useValue: spy }],
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

});
