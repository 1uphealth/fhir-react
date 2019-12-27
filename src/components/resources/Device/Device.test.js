import React from 'react';
import { render } from '@testing-library/react';

import Device from './Device';

import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';

describe('should render Gola component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(<Device {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('123');

    expect(getByTestId('expiry').textContent).toContain('expires');

    expect(getByTestId('typeCoding').textContent).toContain('Drain');
  });
});
