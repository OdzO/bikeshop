import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import { DynamodbService } from './dynamodb.service';

describe('DynamodbService', () => {
  let service: DynamodbService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authClientSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DynamodbService(httpClientSpy, authClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts', () => {
    expect(service.getProducts()).not.toBeNull();
  })
});
