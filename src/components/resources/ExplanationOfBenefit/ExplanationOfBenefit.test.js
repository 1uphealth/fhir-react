import React from 'react';
import { render } from '@testing-library/react';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import fhirResourceTypes from '../fhirResourceTypes';
import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';

describe('should render ExplanationOfBenefit component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirResourceTypes.DSTU2,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('2014-08-16');
    expect(getByTestId('insurer').textContent).toContain('Organization/2');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: example1Stu3,
      fhirVersion: fhirResourceTypes.STU3,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('2014-08-16');
    expect(getByTestId('insurer').textContent).toContain('Organization/2');
    expect(getByTestId('totalCost').textContent).toContain('135.57');
    expect(getByTestId('totalBenefit').textContent).toContain('96');
  });
});
