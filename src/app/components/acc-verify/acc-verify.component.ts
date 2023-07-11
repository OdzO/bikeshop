import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

/**
   * Component to handle registration verification and verification code resending
   */
@Component({
  selector: 'app-acc-verify',
  templateUrl: './acc-verify.component.html',
  styleUrls: ['./acc-verify.component.scss']
})
export class AccVerifyComponent {

  /**
     * @ignore
     */
  verification_code = '';
  /**
     * @ignore
     */
  verification_email = '';

  constructor(private auth: AuthService) {
    this.verification_email = auth.verificationEmail;
  }

  /**
   * If the form is valid, calls the auth service to confirm the registration with the given code.
   * 
   * @param {NgForm} form The form that contains the verification code field
   */
  onVerify(form: NgForm): void {
    if (form.valid) {
      this.auth.confirmRegistration(this.verification_code);
    }
  }

  /**
   * If the verification email exists, sends a new verification code to that email address.
   */
  onResendCode(): void {
    if(this.verification_email){
      this.auth.resendVerificationCode();
    }
  }
}
