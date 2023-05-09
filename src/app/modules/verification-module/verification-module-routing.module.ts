import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccVerifyComponent } from 'src/app/components/acc-verify/acc-verify.component';

const routes: Routes = [
  {
    path: '',
    component: AccVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationModuleRoutingModule { }
