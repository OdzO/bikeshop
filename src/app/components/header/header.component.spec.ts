import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPageComponent } from '../user-page/user-page.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { of } from 'rxjs';
import { LowerCasePipe } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dbServiceSpy: jasmine.SpyObj<DynamodbService>;
  let router: Router;

  const mockShopData = {
    Items: [
      {
        key: "ProductTypes",
        value: [
         "Frame",
         "Handlebar",
         "Saddle",
         "Crankset"
        ]
       }
    ],
    Count: 1,
    ScannedCount: 1,
  }

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['isUserAdmin','isLoggedIn']);
    const spy2 = jasmine.createSpyObj('DynamodbService', ['getShopData']);

    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatMenuModule, LowerCasePipe, RouterTestingModule.withRoutes(
        [{ path: 'user-page', component: UserPageComponent }, { path: 'login', component: LoginComponent }]
      )],
      declarations: [HeaderComponent],
      providers: [HttpClient, HttpHandler, MatSnackBar, { provide: AuthService, useValue: spy }, { provide: DynamodbService, useValue: spy2 }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    dbServiceSpy = TestBed.inject(DynamodbService) as jasmine.SpyObj<DynamodbService>;
    dbServiceSpy.getShopData = jasmine.createSpy().and.returnValue(of(mockShopData));

    router = TestBed.inject(Router);
    

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on user icon click if not logged in', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(false);
    component.onUserIcon();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to user page on user icon click if logged in', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    component.onUserIcon();
    expect(router.navigate).toHaveBeenCalledWith(['user-page']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test if router navigate fails', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.reject(Error('Navigate error')));
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    component.onUserIcon();
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(false);
    component.onUserIcon();
    expect(router.navigate).toHaveBeenCalledWith(['user-page']);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
