import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DynamodbService } from 'src/app/services/dynamodb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  productTypes = [];

  constructor(private router: Router, private db: DynamodbService, public auth: AuthService, public cart: CartService) { 
    this.db.getShopData().subscribe(resp => {
      this.productTypes = resp.Items[resp.Items.findIndex(x => x.key === 'ProductTypes')].value;
    });
  }

  onUserIcon() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['user-page']).catch(error => {
        alert(error.message);
      });
    } else {
      this.router.navigate(['login']).catch(error => {
        alert(error.message);
      });
    }
  }
}
