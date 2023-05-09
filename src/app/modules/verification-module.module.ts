import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccVerifyComponent } from 'src/app/components/acc-verify/acc-verify.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccVerifyComponent
  }
];

@NgModule({
  declarations: [AccVerifyComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatFormFieldModule
  ],
  exports: [RouterModule]
})
export class VerificationModuleModule { }
