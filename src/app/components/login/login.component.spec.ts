import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signIn', 'signUp']);

    await TestBed.configureTestingModule({
      imports: [MatTabsModule, MatFormFieldModule, MatDividerModule, MatInputModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: spy}]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.signIn = jasmine.createSpy().and.callFake(() => {return});
    authServiceSpy.signUp = jasmine.createSpy().and.callFake(() => {return});

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth service on sign in if form valid', () => {
    component.loginForm.controls.email.setValue('mock@email.com');
    component.loginForm.controls.password.setValue('mockPA$$word123');
    expect(component.loginForm.valid).toEqual(true);
    component.onSignIn();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });

  it('dummy - clear validators to check impossible scenario but have full branch coverage', () => {
    component.loginForm.controls.email.clearValidators();
    component.loginForm.controls.email.updateValueAndValidity();
    component.loginForm.controls.password.clearValidators();
    component.loginForm.controls.password.updateValueAndValidity();
    component.onSignIn();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });

  it('dummy - clear validators to check impossible scenario but have full branch coverage', () => {
    component.loginForm.controls.email.clearValidators();
    component.loginForm.controls.email.updateValueAndValidity();
    component.loginForm.controls.password.clearValidators();
    component.loginForm.controls.password.updateValueAndValidity();
    component.onSignUp();
    expect(authServiceSpy.signUp).toHaveBeenCalled();
  });

  it('should call auth service on sign up if form valid', () => {
    component.loginForm.controls.email.setValue('mock@email.com');
    component.loginForm.controls.password.setValue('mockPA$$word123');
    expect(component.loginForm.valid).toEqual(true);
    component.onSignUp();
    expect(authServiceSpy.signUp).toHaveBeenCalled();
  });

  it('should get correct error message', () => {
    const control = new FormControl('', [Validators.email]);
    control.setValue('asd.com');
    expect(component.getErrorMessage(control)).toContain('Email format');
    const pass = new FormControl('', [component.validatePassword()]);
    pass.setValue('123');
    expect(component.getErrorMessage(pass)).toContain('lowercase');
    pass.setValue('asd');
    expect(component.getErrorMessage(pass)).toContain('uppercase');
    pass.setValue('asdASD');
    expect(component.getErrorMessage(pass)).toContain('numeric');
    pass.setValue('asdASD123');
    expect(component.getErrorMessage(pass)).toContain('special');
    pass.setValue('asdASD123?');
    expect(component.getErrorMessage(pass)).toContain('invalid');
  });
});
