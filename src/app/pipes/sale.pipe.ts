import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'sale'
})
export class SalePipe implements PipeTransform {

  transform(price: number, sale: number): number {
    return price - price*(sale/100);
  }

}
