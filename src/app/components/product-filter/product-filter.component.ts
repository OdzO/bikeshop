import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input() filter!: Filter;

  constructor(private filterService: FilterService) {

  }

  ngOnInit(): void {
    if (this.filter.values) {
      this.filter.type = typeof this.filter.values[0] === 'string' ? 'multiselect' : 'range';
      if (this.filter.type === 'range') {
        this.setRangeEnds();
        this.filter.selectedMin = this.filter.selectedMin ? this.filter.selectedMin : this.filter.rangeMin;
        this.filter.selectedMax = this.filter.selectedMax ? this.filter.selectedMax : this.filter.rangeMax;
      } else {
        this.filter.selected = this.filter.selected ? this.filter.selected : [];
      }
    }
  }

  setRangeEnds(): void{
    if(this.filter.values){
      const numValue = Number(this.filter.values[0]);
        let rangeMin = numValue;
        let rangeMax = numValue;
        this.filter.values.forEach(e => {
          const n = Number(e);
          if (rangeMin > n) {
            rangeMin = n;
          }
          if (rangeMax < n) {
            rangeMax = n;
          }
        });
        this.filter.rangeMin = rangeMin;
        this.filter.rangeMax = rangeMax;
    }
  }

  setValue(value: string) {
    if (this.filter.selected) {
      if (this.filter.selected.includes(value)) {
        this.filter.selected = this.filter.selected.filter(v => v != value);
      } else {
        this.filter.selected.push(value.toLowerCase());

      }
      this.filterService.changeFilter(this.filter);
    }
  }

  setRange() {
    this.filterService.changeFilter(this.filter);
  }

  getStringValues(): string[] {
    const sValues: string[] = [];
    this.filter.values?.forEach(v => {
      sValues.push(String(v));
    });
    return sValues;
  }

  isFilterActive(): boolean {
    if (this.filter.type == 'range') {
      return this.filter.selectedMin != undefined && this.filter.selectedMax != undefined && this.filter.rangeMin != undefined && this.filter.rangeMax != undefined
        && (this.filter.selectedMin > this.filter.rangeMin || this.filter.selectedMax < this.filter.rangeMax);
    } else {
      return this.filter.selected != undefined && this.filter.selected.length > 0;
    }
  }
}
