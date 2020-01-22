import React from 'react';
import { render } from '@testing-library/react';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';

describe('should render ExplanationOfBenefit component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
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
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('2014-08-16');
    expect(getByTestId('insurer').textContent).toContain('Organization/2');
    expect(
      getByTestId('totalCost').textContent.replace(/\u00a0/g, ' '),
    ).toEqual('135.57 USD');
    expect(
      getByTestId('totalBenefit').textContent.replace(/\u00a0/g, ' '),
    ).toContain('96 USD');
    expect(getByTestId('hasServices').textContent).toContain('(1200)');
  });

  it('should render with STU3 source data which contains the information data', () => {
    const defaultProps = {
      fhirResource: example2Stu3,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('hasInformation').textContent).toContain(
      'Dispense as Written',
    );
  });
});
