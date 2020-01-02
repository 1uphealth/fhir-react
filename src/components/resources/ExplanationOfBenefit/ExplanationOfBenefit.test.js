import React from 'react';
import { render } from '@testing-library/react';

import ExplanationOfBenefit from './ExplanationOfBenefit';

import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';

describe('should render ExplanationOfBenefit component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('2014-08-16');
    expect(getByTestId('insurer').textContent).toContain('Organization/2');
  });
});
