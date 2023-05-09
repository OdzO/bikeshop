import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListModuleRoutingModule } from './product-list-module-routing.module';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductFilterComponent } from 'src/app/components/product-filter/product-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { SalePipe } from 'src/app/pipes/sale.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [ProductListComponent, ProductFilterComponent, ProductCardComponent],
  imports: [
    CommonModule,
    ProductListModuleRoutingModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    SalePipe,
    MatSelectModule
  ]
})
export class ProductListModuleModule { }
