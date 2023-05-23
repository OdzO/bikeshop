import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamoDbScan } from 'src/app/interfaces/dynamo-db-scan';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

/**
   * Single point of access to DynamoDB data.
   * 
   */
@Injectable({
  providedIn: 'root',
})
export class DynamodbService {
  /**
   * Constructor injects HttpClients for HTTP calls and AuthService for gathering the user token.
   */
  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Creates the httpOptions object with a valid userToken from the signed in user.
   * This is how you can validate a user when calling a restricted API address.
   * 
   * @param {unknown} deleteObject If this is used for a delete call, add an object with table name and the key of the product to delete
   * @returns The full httpOptions object with the token in the HttpHeader
   */
  private setHeader(deleteObject?: unknown): object {
    const token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      observe: 'response',
      body: deleteObject
    };
    return httpOptions;
  }

  /**
   * Collects all products from DynamoDB.
   * 
   * @returns An Observable with the response from the DynamoDB API
   */
  getProducts(): Observable<DynamoDbScan> {
    const url = environment.dynamoDbApi + environment.dynamoDbTableProducts;
    return this.http.get<DynamoDbScan>(url);
  }

  /**
   * Collects shop specific data (product types) from DynamoDB.
   * 
   * @returns An Observable with the response from the DynamoDB API
   */
  getShopData(): Observable<DynamoDbScan> {
    const url = environment.dynamoDbApi + environment.dynamoDbTableShopData;
    return this.http.get<DynamoDbScan>(url);
  }

  /**
   * Commits a single product in DynamoDB.
   * 
   * @param {Product} product  The product to commit
   * @returns An Observable with the response body from the DynamoDB API
   */
  commitProduct(product: Product): Observable<object> {
    const entry = { TableName: 'Products', Item: product };
    return this.http.post(environment.dynamoDbApi, entry, this.setHeader());
  }

  /**
   * Deletes a single product from DynamoDB.
   * 
   * @param {Product} product  The product to delete
   * @returns An Observable with the response body from the DynamoDB API
   */
  deleteProduct(delProduct: Product): Observable<object> {
    const entry = { TableName: 'Products', Key: { pkey: delProduct.pkey } };
    return this.http.delete(environment.dynamoDbApi, this.setHeader(entry));
  }
}
