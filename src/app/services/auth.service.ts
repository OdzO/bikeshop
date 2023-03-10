import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verification_email = "";
  private userPool: CognitoUserPool;
  private userLoggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    const poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    this.userPool = new CognitoUserPool(poolData);
    this.userLoggedIn = new BehaviorSubject<boolean>(false);
  }

  /**
   * Signs in a user to AWS Cognito with the given email and password
   *
   * @param email - The user's email in string format
   * @param password - The user's password in string format
   */
  signIn(email: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        this.router.navigate(["user-page"]);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  signOut(): void {
    const cognitoUser = this.userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.userLoggedIn.next(false);
    this.router.navigate(["login"])
  }

  signUp(email: string, password: string, name: string) {
    const attributeList = [];
    if (name) {
      attributeList.push(new CognitoUserAttribute({ Name: "name", Value: name }))
    }
    this.userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
      if (result) {
        this.verification_email = email;
        this.router.navigate(["verification"]);
      }
    });
  }

  confirmRegistration(code: string) {
    const userData = { Username: this.verification_email, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, false, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
      if (result) {
        this.router.navigate(["user-page"]);
      }
    });
  }

  getToken(): string {
    const session: CognitoUserSession | null = this.getCognitoUserSession();
    if (session) {
      return session.getIdToken().getJwtToken();
    }
    return "";
  }

  getCurrentUserName(): string {
    const session: CognitoUserSession | null = this.getCognitoUserSession();
    if (session) {
      return session.getIdToken().decodePayload()['name'];
    }
    return "";
  }

  isLoggedIn(): boolean {
    let isAuth = false;

    const session: CognitoUserSession | null = this.getCognitoUserSession();
    if (session) {
      isAuth = session.isValid();
    }

    this.userLoggedIn.next(isAuth);
    return isAuth;
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  private getCognitoUserSession(): CognitoUserSession | null {
    let cognitoSession: CognitoUserSession | null = null;
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession((error: Error | null, session: CognitoUserSession | null) => {
        if (error) {
          alert(error.message || JSON.stringify(error));
        }
        if (session) {
          cognitoSession = session;
        }
      })
    }
    return cognitoSession;
  }
}