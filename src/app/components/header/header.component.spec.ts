import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPageComponent } from '../user-page/user-page.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['isUserAdmin','isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, MatBadgeModule, RouterTestingModule.withRoutes(
        [{ path: 'user-page', component: UserPageComponent }, { path: 'login', component: LoginComponent }]
      )],
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on user icon click if not logged in', () => {
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(false);
    component.onUserIcon();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to user page on user icon click if logged in', () => {
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    component.onUserIcon();
    expect(router.navigate).toHaveBeenCalledWith(['user-page']);
  });
});
