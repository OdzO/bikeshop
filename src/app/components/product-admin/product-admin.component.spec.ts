import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminComponent } from './product-admin.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { DialogNewProductAttributeComponent } from '../dialog-new-product-attribute/dialog-new-product-attribute.component';

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;
  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;

  const mockProductList = {
    Items: [
      {
        pkey: 'frame-20230218141923',
        price: 999,
        name: 'Trifox X10',
        type: 'frame',
        attributes: { size: "S", length: 48 },
      },
      {
        pkey: '2023-02-18T21:00:28.630Z',
        price: '1299',
        name: 'Trek 2022',
        type: 'frame',
        attributes: { size: "L", length: 56 },
      },
    ],
    Count: 2,
    ScannedCount: 2,
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DynamodbService', ['getProducts','commitProduct']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatTableModule],
      declarations: [ProductAdminComponent],
      providers: [HttpClient, HttpHandler, { provide: DynamodbService, useValue: spy }]
    })
      .compileComponents();

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getProducts = jasmine.createSpy().and.returnValue(of(mockProductList));
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

  it('should select the correct item to edit', () => {
    component.onEdit('frame-20230218141923');
    expect(component.editProduct).toEqual(<Product>mockProductList.Items[0]);
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
    component.onEdit('frame-20230218141923');
    component.onDeleteAttribute('size');
    expect(component.editProduct?.attributes).not.toBeNull();
    expect(component.editProduct?.attributes).toEqual({ length: 48 });
  });

  it('should return correct type', () => {
    expect(component.typeof('abc')).toEqual('string');
    expect(component.typeof(11)).toEqual('number');
  });

  it('should save product', () => {
    component.onEdit('frame-20230218141923');
    component.onSave();
    expect(component.editProduct).toBeNull();
    expect(component.products.length).toEqual(mockProductList.Items.length);
  });
  
});