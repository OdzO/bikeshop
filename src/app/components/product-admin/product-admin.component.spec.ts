import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminComponent } from './product-admin.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;
  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;

  const mockProductList = {
    Items: [
      {
        pkey: 'test1',
        price: 999,
        name: 'Trifox X10',
        type: 'frame',
        attributes: { size: "S", length: 48 },
      },
      {
        pkey: 'test2',
        price: 999,
        name: 'Trifox X10',
        type: 'frame',
        attributes: { size: "S", length: 48 },
      },
      {
        pkey: 'test3',
        price: 999,
        name: 'Trifox X10',
        type: 'frame',
        attributes: { size: "S", length: 48 },
      },
      {
        pkey: 'test4',
        price: 999,
        name: 'Trifox X10',
        type: 'frame',
      },
    ],
    Count: 4,
    ScannedCount: 4,
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
    const spy = jasmine.createSpyObj('DynamodbService', ['getProducts','commitProduct', 'getShopData']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatTableModule],
      declarations: [ProductAdminComponent],
      providers: [HttpClient, HttpHandler, { provide: DynamodbService, useValue: spy }]
    })
      .compileComponents();

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getProducts = jasmine.createSpy().and.returnValue(of(mockProductList));
    dbServiceSpy.getShopData = jasmine.createSpy().and.returnValue(of(mockShopData));
    dbServiceSpy.commitProduct = jasmine.createSpy().and.returnValue(of(true));

    fixture = TestBed.createComponent(ProductAdminComponent);
    component = fixture.componentInstance;

    TestBed.inject(DynamodbService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.products.length).toEqual(mockProductList.Items.length);
  });

  it('should empty edit product on cancel', () => {
    component.onCancel();
    expect(component.editProduct).toBeNull();
  });

  it('should add new product to edit', () => {
    spyOn(component.table, 'renderRows');
    component.onAddProduct();
    expect(component.products.length).toEqual(mockProductList.Items.length);
    expect(component.editProduct).toEqual(<Product>mockProductList.Items[mockProductList.Items.length - 1]);
  });

  it('should delete attribute', () => {
    component.onEdit('test1');
    component.onDeleteAttribute('size');
    expect(component.editProduct?.attributes).not.toBeNull();
    expect(component.editProduct?.attributes).toEqual({ length: 48 });
  });

  it('should return correct type', () => {
    expect(component.typeof('abc')).toEqual('string');
    expect(component.typeof(11)).toEqual('number');
  });

  it('should save product', () => {
    component.onEdit('test2');
    component.onSave();
    expect(component.editProduct).toBeNull();
    expect(component.products.length).toEqual(mockProductList.Items.length);
  });

  it('should add attribute', () => {
    component.onEdit('test3');
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({ attrName: 'year', attrValue: 2022 }), close: null });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    component.onAddAttribute();
    expect(component.editProduct?.attributes).toEqual({ size: "S", length: 48, year: 2022});
  });

  it('should create and add attribute', () => {
    component.onEdit('test4');
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({ attrName: 'year', attrValue: 2022 }), close: null });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    component.onAddAttribute();
    expect(component.editProduct?.attributes).toEqual({ year: 2022});
  });
  
});