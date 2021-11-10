import { getBootstrapClass } from './getBootstrapClass';

describe('Bootstrap class function', () => {
  it('should return two bootstrap classes', () => {
    expect(getBootstrapClass('teal')).toEqual('bg-teal-100 text-teal-600');
  });
});
