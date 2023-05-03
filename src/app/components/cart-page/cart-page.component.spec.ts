import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [MatSnackBar],
      declarations: [CartPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
