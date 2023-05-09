import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccVerifyComponent } from 'src/app/components/acc-verify/acc-verify.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class VerificationModuleModule { }
