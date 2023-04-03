import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewProductAttributeComponent } from './dialog-new-product-attribute.component';

describe('DialogNewProductAttributeComponent', () => {
  let component: DialogNewProductAttributeComponent;
  let fixture: ComponentFixture<DialogNewProductAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogNewProductAttributeComponent]
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
