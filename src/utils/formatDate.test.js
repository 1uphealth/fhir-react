import { formatDate } from './formatDate';

describe('Date format function', () => {
  const locale = 'en-US';

  it('should return year', () => {
    const date = '2021';
    expect(formatDate(date, locale)).toEqual('2021');
  });
  it('should return US month and year', () => {
    const date = '2021-03';
    expect(formatDate(date, locale)).toEqual('March 2021');
  });
  it('should return US date format', () => {
    const date = '2021-03-14';
    expect(formatDate(date, locale)).toEqual('03/14/2021');
  });
  it('should return US date format given full timestamp', () => {
    const date = '2021-03-14T13:28:17-05:00';
    expect(formatDate(date, locale)).toEqual('03/14/2021');
  });
});
