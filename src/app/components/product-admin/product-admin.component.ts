import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements AfterViewInit {

  products: Product[] = [];
  editProduct: Product | null = null;

  @ViewChild(MatTable) table!: MatTable<Product>;
  displayedColumns: string[] = ['name', 'type', 'price', 'action'];

  constructor(private db: DynamodbService) { }

  ngAfterViewInit(): void {
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
}
