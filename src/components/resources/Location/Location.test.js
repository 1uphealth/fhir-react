import React from 'react';
import { render } from '@testing-library/react';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';

describe('should render Location component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(<Location {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'South Wing, second floor',
    );

    expect(getByTestId('status').textContent).toContain('active');

    expect(getByTestId('description').textContent).toContain(
      'Second floor of the Old South Wing',
    );

    expect(getByTestId('address').textContent).toContain('Galapagosweg 91');

    expect(getByTestId('telecom').textContent).toContain('fax2329');
  });
});
