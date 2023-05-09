import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationModuleRoutingModule } from './verification-module-routing.module';
import { AccVerifyComponent } from 'src/app/components/acc-verify/acc-verify.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [AccVerifyComponent],
  imports: [
    CommonModule,
    VerificationModuleRoutingModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class VerificationModuleModule { }
