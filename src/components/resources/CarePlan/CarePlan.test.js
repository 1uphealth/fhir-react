import React from 'react';
import { render } from '@testing-library/react';
import CarePlan from './CarePlan';

import examplecarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('active');

    expect(getByTestId('category').textContent).toContain('Longitudinal');
    expect(getByTestId('addresses').textContent).toContain('Dog bite');
    expect(getByTestId('activity').textContent).toContain('ADULT DIET');
  });
});
