import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccVerifyComponent } from './components/acc-verify/acc-verify.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: AccVerifyComponent },
  { path: 'admin', component: ProductAdminComponent, canActivate: [AuthGuard] },
  { path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule { }
