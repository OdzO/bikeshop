import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CognitoUserAttribute, CognitoUserPool, ISignUpResult, NodeCallback } from 'amazon-cognito-identity-js';
import { CognitoUser } from 'amazon-cognito-identity-js';

//This is just a dummy test class for the service
describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  const mockUserPool = new CognitoUserPool({UserPoolId: 'us-east-2_sMPrRasda', ClientId: 'asd'});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'verification', redirectTo: '' }]
      )]
    });
    
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    
    service = TestBed.inject(AuthService);
    service.userPool = mockUserPool;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail sign in', () => {
    service.signIn('email','password');
  });

  it('should fail sign up', () => {
    spyOn(mockUserPool, 'signUp').and.callFake((username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback: NodeCallback<Error, ISignUpResult>) => {
      const err = new Error('MockError');
      callback.call(null, err, undefined);
    });
    service.signUp('email','password','name');
    expect(router.navigate).not.toHaveBeenCalledWith(['verification']);
  });

  it('should sign up', () => {
    spyOn(mockUserPool, 'signUp').and.callFake((username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback: NodeCallback<Error, ISignUpResult>) => {
      const result = <ISignUpResult>{};
      callback.call(null, undefined, result);
    });
    service.signUp('email','password','name');
    expect(router.navigate).toHaveBeenCalledWith(['verification']);
  });

  it('should fail sign out', () => {
    service.signOut();
  });

  it('should fail registration confirm', () => {
    service.confirmRegistration('code');
  });

  it('should get token if session is valid', () => {
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue({getIdToken(){return {getJwtToken(){return 'mockTokenValue'}}}});
    expect(service.getToken()).toEqual('mockTokenValue');
  });

  it('should get empty token if session is invalid', () => {
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue(null);
    expect(service.getToken()).toEqual('');
  });

  it('should get username', () => {
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue({getIdToken(){return {decodePayload(){return {'name': 'mockUsername'}}}}});
    expect(service.getCurrentUserName()).toEqual('mockUsername');
  });

  it('should check if user is logged in', () => {
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue({isValid(){return true}});
    expect(service.isLoggedIn()).toEqual(true);
  });

  it('should check if user admin', () => {
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue({getAccessToken(){return {payload: {'cognito:groups': ['shopAdmins']}}}});
    expect(service.isUserAdmin()).toEqual(true);
  });

  it('should return empty username if user session invalid', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    spyOn(mockUserPool, 'getCurrentUser').and.returnValue(cu);
    expect(service.getCurrentUserName()).toEqual('');
  });

});
