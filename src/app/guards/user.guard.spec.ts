import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

describe('UserGuard', () => {
  let guard: UserGuard;
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
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    guard = TestBed.inject(UserGuard);
  });

  it('should redirect to login if user not logged in', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.reject(Error('Navigate error')));
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(false);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should guard activate if user valid', () => {
    authServiceSpy.isLoggedIn = jasmine.createSpy().and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });
});
