import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccVerifyComponent } from './acc-verify.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';

describe('AccVerifyComponent', () => {
  let component: AccVerifyComponent;
  let fixture: ComponentFixture<AccVerifyComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const form = new NgForm([],[]);

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['confirmRegistration']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule, MatDividerModule, MatInputModule, BrowserAnimationsModule],
      declarations: [AccVerifyComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(AccVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call confirm registration in auth service if form is valid', () => {
    component.onVerify(form);
    expect(authServiceSpy.confirmRegistration).toHaveBeenCalled();
  });
});
