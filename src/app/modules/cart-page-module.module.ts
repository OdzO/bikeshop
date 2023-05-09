import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageComponent } from 'src/app/components/cart-page/cart-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SalePipe } from 'src/app/pipes/sale.pipe';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CartPageComponent
  }
];

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatIconModule,
    SalePipe
  ],
  exports: [RouterModule]
})
export class CartPageModuleModule { }
