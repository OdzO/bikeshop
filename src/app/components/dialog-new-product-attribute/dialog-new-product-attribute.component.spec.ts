import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewProductAttributeComponent } from './dialog-new-product-attribute.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogNewProductAttributeComponent', () => {
  let component: DialogNewProductAttributeComponent;
  let fixture: ComponentFixture<DialogNewProductAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [DialogNewProductAttributeComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogNewProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
