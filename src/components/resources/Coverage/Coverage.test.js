import React from 'react';
import { render } from '@testing-library/react';
import Coverage from './Coverage';

import exampleCoverage from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverage,
      fhirVersion: 'dstu2',
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('planId').textContent).toContain('CBI35');
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverageStu3,
      fhirVersion: 'stu3',
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('planId').textContent).toContain('B37FC');
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
    expect(getByTestId('details').textContent).toContain('Full Coverage');
  });
});
