import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [MatTabsModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule
      
    ],
    declarations: [LoginComponent]
  })
  export class LoginModule { }