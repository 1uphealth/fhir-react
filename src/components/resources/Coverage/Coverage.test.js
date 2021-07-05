import React from 'react';
import { render } from '@testing-library/react';
import Coverage from './Coverage';
import fhirVersions from '../fhirResourceVersions';

import { nbspRegex } from '../../../testUtils';
import exampleCoverage from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';
import example2CoverageStu3 from '../../../fixtures/stu3/resources/coverage/example2.json';
import exampleCoverageR4 from '../../../fixtures/r4/resources/coverage/example1.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverage,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage Identifier: 12345',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('planId').textContent).toContain('CBI35');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverageStu3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage Identifier: 12345',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(getByTestId('planId').textContent).toContain('B37FC');
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
    expect(getByTestId('details').textContent).toContain('Full Coverage');
  });

  it('should render with STU3 source data which contains the extensions key', () => {
    const defaultProps = {
      fhirResource: example2CoverageStu3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Coverage {...defaultProps} />);

    expect(getByTestId('extensions').textContent).toContain(
      'without end-stage renal disease',
    );
    expect(getByTestId('extensions').textContent).toContain(
      'beneficiary does not have',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: exampleCoverageR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Coverage {...defaultProps} />,
    );

    expect(getByTestId('title').textContent.replace(nbspRegex, ' ')).toContain(
      'Coverage Identifier: 12345',
    );
    expect(getByTestId('issuer').textContent).toContain('Organization/2');
    expect(queryAllByTestId('planId').length).toEqual(0);
    expect(getByTestId('coverageFrom').textContent).toContain('2011-05-23');
    expect(getByTestId('coverageTo').textContent).toContain('2012-05-23');
    expect(getByTestId('type').textContent).toContain('extended healthcare');
    expect(queryAllByTestId('details').length).toEqual(0);
  });
});
