import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from 'src/app/components/product-admin/product-admin.component';

const routes: Routes = [
  {
    path: '',
    component: ProductAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAdminModuleRoutingModule { }
