import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  userName: string;

  constructor(private auth: AuthService) {
    this.userName = this.auth.getCurrentUserName();
  }

  onLogout(): void {
    this.auth.signOut();
  }
}
