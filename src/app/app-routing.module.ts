import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccVerifyComponent } from './components/acc-verify/acc-verify.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';

import { CartPageComponent } from './components/cart-page/cart-page.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'verification', component: AccVerifyComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'admin', component: ProductAdminComponent, canActivate: [AdminGuard] },
  { path: 'user-page', component: UserPageComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
