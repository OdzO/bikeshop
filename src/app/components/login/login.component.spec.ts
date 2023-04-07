import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const form = new NgForm([],[]);

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signIn', 'signUp']);

    await TestBed.configureTestingModule({
      imports: [MatTabsModule, FormsModule, MatFormFieldModule, MatDividerModule, MatInputModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: spy}]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth service on sign in if form valid', () => {
    component.onSignIn(form);
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should call auth service on sign up if form valid', () => {
    component.onSignUp(form);
    expect(authServiceSpy.signUp).toHaveBeenCalled();
  });
});
