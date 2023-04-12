import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamoDbScan } from 'src/app/interfaces/dynamo-db-scan';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DynamodbService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  private setHeader(): object {
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      observe: 'response',
    };
    return httpOptions;
  }

  getProducts() {
    const url = environment.dynamoDbApi + environment.dynamoDbTableProducts;
    return this.http.get<DynamoDbScan>(url);
  }

  getShopData() {
    const url = environment.dynamoDbApi + environment.dynamoDbTableShopData;
    return this.http.get<DynamoDbScan>(url);
  }

  commitProduct(product: Product) {
    const entry = { TableName: 'Products', Item: product };
    return this.http.post(environment.dynamoDbApi, entry, this.setHeader());
  }
}
