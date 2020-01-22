import React from 'react';
import { render } from '@testing-library/react';

import Medication from './Medication';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';

describe('should render Goal component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(<Medication {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Amoxicillin Powder');
    expect(getByTestId('manufacturer').textContent).toContain(
      'http://www.a-smeds.com',
    );
    expect(getByTestId('product-form').textContent).toContain(
      'Powder for Suspension',
    );
    expect(getByTestId('product-ingredient').textContent).toContain(
      'Amoxicillin',
    );
    expect(getByTestId('package-container').textContent).toContain(
      'Bottle - unit',
    );
  });
});
