import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acc-verify',
  templateUrl: './acc-verify.component.html',
  styleUrls: ['./acc-verify.component.scss']
})
export class AccVerifyComponent {

  verification_code = '';
  verification_email = '';

  constructor(private auth: AuthService) {
    this.verification_email = auth.verificationEmail;
  }

  onVerify(form: NgForm) {
    if (form.valid) {
      this.auth.confirmRegistration(this.verification_code);
    }
  }

  onResendCode() {
    if(this.verification_email){
      this.auth.resendVerificationCode();
    }
  }
}
