import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductFilterComponent } from 'src/app/components/product-filter/product-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { SalePipe } from 'src/app/pipes/sale.pipe';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

@NgModule({
  declarations: [ProductListComponent, ProductFilterComponent, ProductCardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    SalePipe,
    MatSelectModule
  ],
  exports: [RouterModule]
})
export class ProductListModuleModule { }
