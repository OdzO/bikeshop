import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = "";
  password = "";
  name = "";

  constructor(private auth: AuthService) { }

  onSignIn(form: NgForm) {
    if (form.valid) {
      this.auth.signIn(this.email, this.password);
    }
  }

  onSignUp(form: NgForm) {
    if (form.valid) {
      this.auth.signUp(this.email, this.password, this.name);
    }
  }
}
