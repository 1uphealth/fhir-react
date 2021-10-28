import { isUrl } from './isUrl';

describe('isUrl function', () => {
  it('should return true if passed a valid Url', () => {
    const str = 'https://placekeanu.com/24/24';
    expect(isUrl(str)).toBeTruthy();
  });
  it('should return false if passed an invalid Url', () => {
    const str = '<div><img/><p>test</p><div>';
    expect(isUrl(str)).toBeFalsy();
  });
});
