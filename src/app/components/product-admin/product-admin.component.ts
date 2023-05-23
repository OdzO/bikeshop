import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { DialogNewProductAttributeComponent } from '../dialog-new-product-attribute/dialog-new-product-attribute.component';
import { DialogDeleteProductComponent } from '../dialog-delete-product/dialog-delete-product.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {
  products: Product[] = [];
  editProduct: Product | null = null;
  types = [];

  @ViewChild(MatTable) table!: MatTable<Product>;
  displayedColumns: string[] = ['name', 'type', 'price', 'action'];

  constructor(private db: DynamodbService, public dialog: MatDialog) {
    this.db.getProducts().subscribe(resp => {
      this.products = resp.Items;
    });

    this.db.getShopData().subscribe(resp => {
      this.types = resp.Items[resp.Items.findIndex(x => x.key === 'ProductTypes')].value;
    });
  }

  onEdit(pkey: string) {
    this.products.forEach(p => {
      if (p.pkey === pkey) {
        this.editProduct = Object.assign({}, p);
      }
    });
  }

  onCancel() {
    this.editProduct = null;
  }

  onSave() {
    if (this.editProduct) {
      this.db.commitProduct(this.editProduct).subscribe({
        next: () => {
          this.editProduct = null;
          this.db.getProducts().subscribe(resp => {
            this.products = resp.Items;
            this.table.renderRows();
          });
        }
      })
    }
  }

  onAddProduct() {
    const pkey = new Date().toISOString();
    const product: Product = { 'pkey': pkey, 'name': 'name', 'type': 'type', 'price': 0, 'sale': 0 };
    this.products.push(product);
    this.table.renderRows();
    this.onEdit(pkey);
  }

  onAddAttribute() {
    const attrName = "";
    const attrValue = "";
    const dialogRef = this.dialog.open(DialogNewProductAttributeComponent, { data: { attrName: attrName, attrValue: attrValue } });

    dialogRef.afterClosed().subscribe(result => {
      if (this.editProduct && result.attrName && result.attrValue) {
        if (this.editProduct.attributes) {
          this.editProduct.attributes.push({ key: result.attrName, value: result.attrValue });
        } else {
          this.editProduct.attributes = [{ key: result.attrName, value: result.attrValue }];
        }
      }
    });
  }

  onDeleteAttribute(attrKey: string) {
    if (this.editProduct?.attributes) {
      this.editProduct.attributes = this.editProduct?.attributes?.filter(attr => attr.key !== attrKey);
    }
  }

  onDeleteProduct(delProd: Product) {
    const dialogRef = this.dialog.open(DialogDeleteProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.db.deleteProduct(delProd).subscribe({
          next: () => {
            this.db.getProducts().subscribe(resp => {
              this.products = resp.Items;
              this.table.renderRows();
            });
          }
        });
      }
    });
  }

  typeof(value: unknown) {
    return typeof value;
  }


}
