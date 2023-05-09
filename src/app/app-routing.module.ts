import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './components/user-page/user-page.component';

import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/product-list-module.module').then(m => m.ProductListModuleModule) },
  { path: 'product-list', loadChildren: () => import('./modules/product-list-module.module').then(m => m.ProductListModuleModule) },
  { path: 'login', loadChildren: () => import('./modules/login.module').then(m => m.LoginModule) },
  { path: 'verification', loadChildren: () => import('./modules/verification-module.module').then(m => m.VerificationModuleModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart-page-module.module').then(m => m.CartPageModuleModule) },
  { path: 'admin', loadChildren: () => import('./modules/product-admin-module.module').then(m => m.ProductAdminModuleModule), canActivate: [AdminGuard] },
  { path: 'user-page', component: UserPageComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
