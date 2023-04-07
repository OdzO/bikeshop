import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'login', redirectTo: '' }]
      )],
      providers: [{ provide: AuthService, useValue: spy }]
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if user not logged in', () => {
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(false);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should redirect to login if user not logged in', () => {
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });
});
