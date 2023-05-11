import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterComponent } from './product-filter.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;
  let filterSvc: FilterService;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FilterService', ['changeFilter']);

    await TestBed.configureTestingModule({
      declarations: [ ProductFilterComponent ],
      imports: [MatSliderModule, FormsModule, MatButtonModule],
      providers: [{ provide: FilterService, useValue: spy }]
    })
    .compileComponents();

    filterSvc = TestBed.inject(FilterService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.filter = {name: 'Type', type: 'multiselect', values: ['frame','wheel'], selected: ['frame']};
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.setValue('wheel');
    expect(filterSvc.changeFilter).toHaveBeenCalled();
    component.setValue('wheel');
    expect(component.filter.selected).toEqual(['frame']);
  });

  it('should set range ends', () => {
    component.filter = {name: 'Price', type: 'range', values: [120,300,150,500,300,60]};
    fixture.detectChanges();
    expect(component.filter.rangeMin).toEqual(60);
    component.setRange();
    expect(filterSvc.changeFilter).toHaveBeenCalled();
  });

  it('should set range ends', () => {
    component.filter = {name: 'Price', type: 'range', values: [120,300,150,500,300,60], selectedMin: 120, selectedMax: 300};
    fixture.detectChanges();
    expect(component.filter.rangeMin).toEqual(60);
  });

  it('should navigate to all products', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.reject(Error('Navigate error')));
    component.filter = {name: 'Price', type: 'range', values: [120,300,150,500,300,60], selectedMin: 120, selectedMax: 300};
    fixture.detectChanges();
    component.navigateToAllProducts();
    expect(router.navigate).toHaveBeenCalledWith(['product-list']);
  });

});
