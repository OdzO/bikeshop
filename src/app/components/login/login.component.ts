import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.validatePassword()]),
    name: new FormControl('')
  });

  constructor(private auth: AuthService) { }

  onSignIn() {
    if (this.loginForm.valid) {
      this.auth.signIn(this.loginForm.controls.email.value || '', this.loginForm.controls.password.value || '');
    }
  }

  onSignUp() {
    if (this.loginForm.valid) {
      this.auth.signUp(this.loginForm.controls.email.value || '', this.loginForm.controls.password.value || '', this.loginForm.controls.name.value || 'Customer');
    }
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) return 'Field is required';
    if (control.hasError('email')) return 'Email format is invalid';
    if (control.hasError('password')) {
      if (!control.getError('password').hasLowerCase) return 'Must contain lowercase chracter'
      if (!control.getError('password').hasUpperCase) return 'Must contain uppercase chracter'
      if (!control.getError('password').hasNumeric) return 'Must contain numeric chracter'
      if (!control.getError('password').hasSpecial) return 'Must contain special chracter'
    }
    return 'Field is invalid';
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[^0-9a-zA-Z]/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      const result = {
        password: {
          hasUpperCase: hasUpperCase,
          hasLowerCase: hasLowerCase,
          hasNumeric: hasNumeric,
          hasSpecial: hasSpecial
        }
      }
      return passwordValid ? null : result;
    }
  }
}