import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  menuElements = [];
  products: Product[] = [];
  displayProducts: Product[] = [];

  constructor(private db: DynamodbService) {
    this.collectProducts();
  }

  private collectProducts() {
    this.db.getProducts().subscribe(resp => {
      this.products = resp.Items;
      this.displayProducts = resp.Items;
    });

    this.db.getShopData().subscribe(resp => {
      this.menuElements = resp.Items[resp.Items.findIndex(x => x.key === 'ProductTypes')].value;
    });
  }

  showType(type: string) {
    const reducedArray: Product[] = [];
    this.products.forEach(element => {
      if (element.type === type) {
        reducedArray.push(element);
      }
    });
    this.displayProducts = reducedArray;
  }

  showAll() {
    this.displayProducts = this.products;
  }
}