import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  constructor(public cart: CartService) { }

  @ViewChild(MatTable) table!: MatTable<Product>;
  displayedColumns: string[] = ['name', 'price', 'action'];
}
