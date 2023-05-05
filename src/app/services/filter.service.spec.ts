import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change filter', () => {
    service.changeFilter({ name: 'Type', values: ['Frame', 'Wheel'], selected: ['Frame'] });
    service.changeFilter({ name: 'Type', values: ['Frame', 'Wheel'], selected: ['Frame', 'Wheel'] });
    service.changeFilter({ name: 'Price', values: [120, 300, 400], rangeMin: 120, rangeMax: 400, selectedMin: 120, selectedMax: 200 });
    expect(service.filtersValue.length).toEqual(2);
  });

  it('should get filters', () => {
    expect(service.filters).toEqual(service.getFilters());
  });

});
