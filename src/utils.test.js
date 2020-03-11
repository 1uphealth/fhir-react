import { toTrimedFixedNumber } from './utils';

describe('Will convert numbers to right number of decimal places', () => {
  it('Trims number to 3 decimal places', () => {
    expect(toTrimedFixedNumber(3.213243, 3)).toEqual(3.213);
  });

  it('Trims numbert to 4 decimal places by default', () => {
    expect(toTrimedFixedNumber(3.213243)).toEqual(3.2132);
  });

  it('Trims zeros at the end of the number', () => {
    expect(toTrimedFixedNumber(3.20001, 2)).toEqual(3.2);
  });

  it('Return value if can\'t parse "test" value as a number', () => {
    expect(toTrimedFixedNumber('test')).toEqual('test');
  });

  it('Return value if passed "123.123" as a string', () => {
    expect(toTrimedFixedNumber('123.123')).toEqual(123.123);
  });
});
