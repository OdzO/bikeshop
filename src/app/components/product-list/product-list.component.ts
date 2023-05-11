import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/interfaces/filter';
import { Product } from 'src/app/interfaces/product';
import { DynamodbService } from 'src/app/services/dynamodb.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  type: string | null = null;

  products: Product[] = [];
  displayProducts: Product[] = [];
  orderBy = 'name-asc';
  filtersHidden = false;
  toggleButtonValue = '<';
  optFilters: Filter[] = [];
  activeFilters: Filter[] = [];

  constructor(private route: ActivatedRoute, private db: DynamodbService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getFilters().subscribe(filters => {
      this.activeFilters = filters;
      this.collectProducts();
    });

    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.type = params.get('type');
      if (this.type) {
        this.filterService.changeFilter({ name: 'Type', values: [this.type], selected: [this.type], generate: false });
      }
    });
    
    this.db.getProducts().subscribe(resp => {
      this.products = resp.Items;
      this.collectProducts();
    });
  }

  private collectProducts() {
    if(this.products.length > 0){   
      this.applyFilters();
      this.generateOptFilters();
      this.orderProducts();
      
    }
    
  }

  compareProductsByNameAsc(a: Product, b: Product): number {
    return a.name.localeCompare(b.name);
  }

  compareProductsByNameDesc(a: Product, b: Product): number {
    return a.name.localeCompare(b.name) * -1;
  }

  compareProductsByPriceAsc(a: Product, b: Product): number {
    const price_a = a.sale ? a.price - a.price * a.sale / 100 : a.price;
    const price_b = b.sale ? b.price - b.price * b.sale / 100 : b.price;
    return price_a > price_b ? 1 : -1;
  }

  compareProductsByPriceDesc(a: Product, b: Product): number {
    const price_a = a.sale ? a.price - a.price * a.sale / 100 : a.price;
    const price_b = b.sale ? b.price - b.price * b.sale / 100 : b.price;
    return price_b > price_a ? 1 : -1;
  }

  orderProducts() {
    switch (this.orderBy) {
      case 'name-desc':
        this.displayProducts.sort(this.compareProductsByNameDesc);
        break;

      case 'price-asc':
        this.displayProducts.sort(this.compareProductsByPriceAsc);
        break;

      case 'price-desc':
        this.displayProducts.sort(this.compareProductsByPriceDesc);
        break;

      default:
        this.displayProducts.sort(this.compareProductsByNameAsc);
        break;
    }
  }

  generateOptFilters() {
    this.optFilters = [];

    if (this.displayProducts.length > 1) {

      this.generateAttributeFilters();

      if (!this.isActiveFilter('Type')) {
        const types: string[] = [];
        this.displayProducts.forEach(p => {
          if (!types.includes(p.type)) {
            types.push(p.type);
          }
        });
        this.optFilters.push({ name: 'Type', generate: true, values: types });
      }

      if (!this.isActiveFilter('Price')) {
        const prices: number[] = [];
        this.displayProducts.forEach(p => {
          prices.push(p.price);
        });
        this.optFilters.push({ name: 'Price', generate: true, values: prices });
      }

    }
  }

  private generateAttributeFilters(): void {
    this.displayProducts[0].attributes?.forEach(a => {
      if (!this.isActiveFilter(a.key)) {
        this.optFilters.push({ name: a.key, generate: true, values: [a.value], type: '' });
      }
    });

    this.displayProducts.slice(1).forEach(p => {
      const tempAttrs: Filter[] = [];
      this.optFilters.forEach(sa => {
        p.attributes?.forEach(pa => {
          if (pa.key === sa.name) {
            sa.values?.push(pa.value);
            tempAttrs.push(sa);
          }
        });
      });
      this.optFilters = tempAttrs;
    });
  }

  hideFilters() {
    this.filtersHidden = this.filtersHidden ? false : true;
    this.toggleButtonValue = this.filtersHidden ? '>' : '<';
  }

  applyFilters() {
    this.displayProducts = [];
    this.products.forEach(prod => {
      let display = true;
      
      this.activeFilters.forEach(filter => {
        if (display) {
          if (filter.name === 'Type' && filter.selected) {
            display = filter.selected.includes(prod.type.toLowerCase());
          }
          else if (filter.name === 'Price') {
            display = this.isValueInRange(prod.price, filter.selectedMin, filter.selectedMax);
          }
          else if (filter.type === 'range') {
            const pVal = Number(this.getProdAttrVal(prod, filter.name));
            display = this.isValueInRange(pVal, filter.selectedMin, filter.selectedMax);
          }
          else if (filter.type === 'multiselect' && filter.selected) {
            const pVal = String(this.getProdAttrVal(prod, filter.name));
            display = filter.selected.includes(pVal.toLowerCase());
          }
        }
      });
      if (display) {
        this.displayProducts.push(prod);
      }
    });
  }

  //move to utils
  isValueInRange(value: number, min: number | undefined, max: number | undefined): boolean {
    if (min && max) {
      return value >= min && value <= max;
    }
    return false;
  }

  isActiveFilter(filterName: string): boolean {
    let result = false;
    this.activeFilters.forEach(f => {
      if (f.name === filterName) {
        result = true;
      }
    });
    return result;
  }

  getProdAttrVal(prod: Product, attrName: string): string | number {
    let result: string | number = '';
    prod.attributes?.forEach(attr => {
      if (attr.key.toLowerCase() === attrName.toLowerCase()) {
        result = attr.value;
      }
    });
    return result;
  }

}