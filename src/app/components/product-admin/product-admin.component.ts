import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { DialogNewProductAttributeComponent } from '../dialog-new-product-attribute/dialog-new-product-attribute.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {

  products: Product[] = [];
  editProduct: Product | null = null;

  @ViewChild(MatTable) table!: MatTable<Product>;
  displayedColumns: string[] = ['name', 'type', 'price', 'action'];

  constructor(private db: DynamodbService, public dialog: MatDialog) {
    this.db.getProducts().subscribe(resp => {
      this.products = resp.Items;
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
    const product: Product = { 'pkey': pkey, 'name': 'name', 'type': 'type', 'price': 0 };
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
        if (this.editProduct.attributes != undefined) {
          this.editProduct.attributes[result.attrName] = result.attrValue;
        } else {
          this.editProduct.attributes = { [result.attrName]: result.attrValue };
        }
      }
    });
  }

  onDeleteAttribute(attrKey: string){
    if(this.editProduct && this.editProduct.attributes != undefined)
    delete this.editProduct.attributes[attrKey];
  }

  typeof(value: unknown){
    return typeof value;
  }


}
