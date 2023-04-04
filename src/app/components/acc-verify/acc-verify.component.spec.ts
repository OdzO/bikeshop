import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccVerifyComponent } from './acc-verify.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AccVerifyComponent', () => {
  let component: AccVerifyComponent;
  let fixture: ComponentFixture<AccVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule, MatDividerModule, MatInputModule, BrowserAnimationsModule],
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
