import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale'
})
export class SalePipe implements PipeTransform {

  transform(price: number, sale: number): number {
    return price - price*(sale/100);
  }

}
