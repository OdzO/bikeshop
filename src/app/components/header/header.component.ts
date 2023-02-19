import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private auth: AuthService) { }

  onUserIcon() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['user-page']);
    } else {
      this.router.navigate(['login']);
    }
  }

  isUserLoggedIn(): boolean {
    let loggedIn = false;
    this.auth.isUserLoggedIn().subscribe((res) => {
      return loggedIn = res;
    });
    return loggedIn;
  }
}
