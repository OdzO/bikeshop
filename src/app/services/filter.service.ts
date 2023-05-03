import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters = new Subject<Filter[]>();
  filtersValue: Filter[] = [];

  changeFilter(filter: Filter){
    this.filtersValue = this.filtersValue.filter(fv => fv.name !== filter.name);
    if((filter.selected && filter.selected.length > 0) 
      || (filter.selectedMin && filter.selectedMax && filter.rangeMin && filter.rangeMax && (filter.selectedMin > filter.rangeMin || filter.selectedMax < filter.rangeMax))){
      this.filtersValue.push(filter);
    }
    this.filters.next(this.filtersValue);
  }
  
}
