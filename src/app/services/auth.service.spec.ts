import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

//This is just a dummy test class for the service
describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    //const spy = jasmine.createSpyObj('CognitoUser', ['authenticateUser']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'verification', redirectTo: '' }]
      )],
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail sign in', () => {
    //spyOn(window, 'alert');
    service.signIn('email','password');
    //expect(window.alert).toHaveBeenCalled();
  });

  it('should fail sign up', () => {
    service.signUp('email','password','name');
  });

  it('should fail sign out', () => {
    service.signOut();
  });

  it('should fail registration confirm', () => {
    service.confirmRegistration('code');
  });

  it('should have an empty token', () => {
    expect(service.getToken()).toEqual('');
  });

  it('should get empty username', () => {
    expect(service.getCurrentUserName()).toEqual('');
  });

  it('user is not logged in', () => {
    expect(service.isLoggedIn()).toEqual(false);
  });

});
