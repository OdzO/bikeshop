import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private db: DynamodbService) {
    this.collectProducts();
  }

  private collectProducts() {
    this.db.getProducts().subscribe(resp => {
      this.products = resp.Items;
    });
  }
}