import { DynamodbService } from './dynamodb.service';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

describe('DynamodbService', () => {
  let service: DynamodbService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authSpy }, { provide: HttpClient, useValue: httpSpy }]
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    service = TestBed.inject(DynamodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts', () => {
    expect(service.getProducts()).not.toBeNull();
  });

  it('getShopData', () => {
    expect(service.getShopData()).not.toBeNull();
  });

  it('should commit product', () => {
    authServiceSpy.getToken = jasmine.createSpy().and.returnValue('mockToken');
    service.commitProduct(<Product>{});
    expect(httpServiceSpy.post).toHaveBeenCalled();
  });

});
