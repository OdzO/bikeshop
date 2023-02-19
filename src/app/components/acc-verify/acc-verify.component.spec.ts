import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccVerifyComponent } from './acc-verify.component';

describe('AccVerifyComponent', () => {
  let component: AccVerifyComponent;
  let fixture: ComponentFixture<AccVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccVerifyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
