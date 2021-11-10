import { getBadgeColor } from './getBadgeColor';

describe('Badge Color function', () => {
  it('should return two bootstrap classes', () => {
    expect(getBadgeColor({ children: 'active' })).toEqual(
      'bg-teal-100 text-teal-600',
    );
  });
  it('should return generic classes if status is not valid', () => {
    expect(getBadgeColor({ children: 'asdf' })).toEqual(
      'bg-gray-200 text-blue-900',
    );
  });
});
