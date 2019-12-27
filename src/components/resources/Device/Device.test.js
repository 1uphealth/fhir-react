import React from 'react';
import { render } from '@testing-library/react';

import Device from './Device';

import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';
import stu3Example2 from '../../../fixtures/stu3/resources/device/example2.json';

describe('should render Device component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: 'dstu2',
    };

    const { container, getByTestId } = render(<Device {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('123');

    expect(getByTestId('expiry').textContent).toContain('expires');

    expect(getByTestId('typeCoding').textContent).toContain('Drain');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: 'stu3',
    };

    const { container, getByTestId } = render(<Device {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Octane');

    expect(getByTestId('expiry').textContent).toContain('expires');

    expect(getByTestId('typeCoding').textContent).toContain('Coated');
  });
});
