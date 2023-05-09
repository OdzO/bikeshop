import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdminComponent } from 'src/app/components/product-admin/product-admin.component';
import { DialogNewProductAttributeComponent } from 'src/app/components/dialog-new-product-attribute/dialog-new-product-attribute.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductAdminComponent
  }
];

@NgModule({
  declarations: [ProductAdminComponent, DialogNewProductAttributeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class ProductAdminModuleModule { }
