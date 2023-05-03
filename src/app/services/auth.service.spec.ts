import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, IAuthenticationCallback, ISignUpResult, NodeCallback } from 'amazon-cognito-identity-js';
import { MatSnackBar } from '@angular/material/snack-bar';

//This is just a dummy test class for the service
describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  const mockUserPool = new CognitoUserPool({UserPoolId: 'us-east-2_sMPrRasda', ClientId: 'asd'});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'verification', redirectTo: '' }]
      )],
      providers: [MatSnackBar]
    });
    
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    spyOn(window, 'alert').and.stub;
    
    service = TestBed.inject(AuthService);
    service.userPool = mockUserPool;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    const spy = spyOn<any>(service, 'getCognitoUser').and.returnValue(cu);
    spyOn(cu, 'authenticateUser').and.callFake((authenticationDetails: AuthenticationDetails, callbacks: IAuthenticationCallback) => {
      const cusession = jasmine.createSpyObj('CognitoUserSession', ['signOut']);
      callbacks.onSuccess.call('', cusession);
    });
    
    service.signIn('email','password');
    expect(cu.authenticateUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['user-page']);
  });

  it('should fail sign in', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    spyOn<any>(service, 'getCognitoUser').and.returnValue(cu);
    spyOn(cu, 'authenticateUser').and.callFake((authenticationDetails: AuthenticationDetails, callbacks: IAuthenticationCallback) => {
      const cusession = jasmine.createSpyObj('CognitoUserSession', ['signOut']);
      callbacks.onFailure.call('', cusession);
    });
    service.signIn('email','password');
    expect(cu.authenticateUser).toHaveBeenCalled();
  });

  it('should sign up', () => {
    spyOn(mockUserPool, 'signUp').and.callFake((username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback: NodeCallback<Error, ISignUpResult>) => {
      const result = <ISignUpResult>{};
      callback.call(null, undefined, result);
    });
    service.signUp('email','password','name');
    expect(router.navigate).toHaveBeenCalledWith(['verification']);
  });

  it('should fail sign up', () => {
    spyOn(mockUserPool, 'signUp').and.callFake((username: string, password: string, userAttributes: CognitoUserAttribute[], validationData: CognitoUserAttribute[], callback: NodeCallback<Error, ISignUpResult>) => {
      const err = new Error();
      callback.call(null, err, undefined);
    });
    service.signUp('email','password','name');
    expect(router.navigate).not.toHaveBeenCalledWith(['verification']);
  });

  it('should sign out user', () => {
    const cu = jasmine.createSpyObj('CognitoUser', ['signOut']);
    spyOn(mockUserPool, 'getCurrentUser').and.returnValue(cu);
    service.signOut();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should confirm registration', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    spyOn<any>(service, 'getCognitoUser').and.returnValue(cu);
    spyOn(cu, 'confirmRegistration').and.callFake((code: string, forceAliasCreation: false, callback: NodeCallback<any, any>) => {
      callback.call(null, null, true);
    })
    service.confirmRegistration('code');
    expect(cu.confirmRegistration).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['user-page']);
  });

  it('should fail confirm registration', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    spyOn<any>(service, 'getCognitoUser').and.returnValue(cu);
    spyOn(cu, 'confirmRegistration').and.callFake((code: string, forceAliasCreation: false, callback: NodeCallback<any, any>) => {
      callback.call(null, true);
    })
    service.confirmRegistration('code');
    expect(cu.confirmRegistration).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['user-page']);
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
    spyOn<any>(service, 'getCognitoUserSession').and.returnValue(null);
    expect(service.getCurrentUserName()).toEqual('');
  });

  it('should fail to get CognitoUserSession', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    spyOn(mockUserPool, 'getCurrentUser').and.returnValue(cu);
    spyOn(cu, 'getSession').and.callFake((callback: ((error: Error | null, session: CognitoUserSession | null) => void)) => {   
      const err: Error | null = new Error();
      callback.call(null, err, null);
    })
    expect(service.isLoggedIn()).toEqual(false);
  });

  it('should get CognitoUserSession', () => {
    const cu = new CognitoUser({Username: 'MockUser', Pool: mockUserPool});
    
    spyOn(mockUserPool, 'getCurrentUser').and.returnValue(cu);
    spyOn(cu, 'getSession').and.callFake((callback: ((error: Error | null, session: CognitoUserSession | null) => void)) => {   
      const cusession = jasmine.createSpyObj('CognitoUserSession', ['isValid']);
      cusession.isValid.and.returnValue(true);
      callback.call(null, null, cusession);
    })
    expect(service.isLoggedIn()).toEqual(true);
  });

});
