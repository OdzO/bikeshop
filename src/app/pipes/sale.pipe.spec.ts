import { SalePipe } from './sale.pipe';

describe('SalePipe', () => {
  it('create an instance', () => {
    const pipe = new SalePipe();
    expect(pipe).toBeTruthy();
  });

  it('calculate 10 percent sale', () => {
    const pipe = new SalePipe();
    expect(pipe.transform(100, 10)).toEqual(90);
  });
});
