import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { AuthService } from 'src/app/services/auth.service';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['getCurrentUserName','signOut']);

    await TestBed.configureTestingModule({
      declarations: [UserPageComponent],
      providers: [{ provide: AuthService, useValue: spy }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout call auth service', () => {
    component.onLogout();
    expect(authServiceSpy.getCurrentUserName).toHaveBeenCalled();
  });
});
