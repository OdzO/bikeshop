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
import { TestObjects } from 'src/app/misc/TestObjects';
import { MatSelectModule } from '@angular/material/select';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';
import { SalePipe } from 'src/app/pipes/sale.pipe';
import { ActivatedRoute } from '@angular/router';

class ActivateRouteValueClass {
  get(): string{
    return "frame";
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;
  let filterServiceSpy: jasmine.SpyObj<FilterService>;

  const mockProductList = {
    Items: [
      TestObjects.TestProductOrder1,
      TestObjects.TestProductOrder2,
      TestObjects.TestProductOrder3,
      TestObjects.TestProductOrder4
    ],
    Count: 2,
    ScannedCount: 2,
  };

  const actRouteValue = new ActivateRouteValueClass();

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DynamodbService', ['getProducts']);
    const spy2 = jasmine.createSpyObj('FilterService', ['getFilters']);

    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, MatCardModule, MatIconModule, MatButtonToggleModule, MatSelectModule, MatButtonModule, MatSliderModule, BrowserAnimationsModule, FormsModule, SalePipe],
      declarations: [ProductListComponent, ProductCardComponent, ProductFilterComponent],
      providers: [HttpClient, HttpHandler, MatSnackBar, { provide: DynamodbService, useValue: spy }, { provide: FilterService, useValue: spy2 }, { provide: ActivatedRoute, useValue: {paramMap: of(actRouteValue)}}],
    }).compileComponents();

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getProducts = jasmine.createSpy().and.returnValue(of(mockProductList));

    filterServiceSpy = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;
    filterServiceSpy.getFilters = jasmine.createSpy().and.returnValue(of([]));

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    TestBed.inject(DynamodbService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.products.length).toEqual(4);
    expect(component.activeFilters.length).toEqual(0);
  });

  it('should hide filters', () => {
    component.hideFilters();
    expect(component.filtersHidden).toEqual(true);
  });

  it('should display filters', () => {
    component.filtersHidden = true;
    component.hideFilters();
    expect(component.filtersHidden).toEqual(false);
  });

  it('should get value of specific product attribute', () => {
    expect(component.getProdAttrVal(TestObjects.TestProduct1, 'length')).toEqual(48);
  });

  it('should return is active or not', () => {
    component.activeFilters = [{ name: 'Type' }];
    expect(component.isActiveFilter('Type')).toEqual(true);
    expect(component.isActiveFilter('Price')).toEqual(false);
    component.activeFilters = [];
  });

  it('should return if value in range', () => {
    expect(component.isValueInRange(3, 1, 5)).toEqual(true);
    expect(component.isValueInRange(6, 1, 5)).toEqual(false);
    expect(component.isValueInRange(6, 1, undefined)).toEqual(false);
  });

  it('should order products', () => {
    component.orderBy = 'price-asc';
    component.orderProducts();
    expect(component.displayProducts[0]).toEqual(TestObjects.TestProductOrder3);

    component.orderBy = 'name-desc';
    component.orderProducts();
    expect(component.displayProducts[0]).toEqual(TestObjects.TestProductOrder1);

    component.orderBy = 'price-desc';
    component.orderProducts();
    expect(component.displayProducts[0]).toEqual(TestObjects.TestProductOrder4);
  });


  it('should apply filters', () => {
    component.activeFilters = [
      { name: 'Type', selected: ['frame'], type: 'multiselect'}
      , { name: 'Price', selectedMin: 500, selectedMax: 1500, type: 'range' }
      , { name: 'Size', selected: ['s'], type: 'multiselect' }
      , { name: 'Length', selectedMin: 30, selectedMax: 50, type: 'range' }
    ]
    component.applyFilters();
    expect(component.displayProducts.length).toEqual(4);
  });

});
