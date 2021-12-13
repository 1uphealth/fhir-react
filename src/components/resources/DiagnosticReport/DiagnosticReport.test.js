import React from 'react';
import { render } from '@testing-library/react';
import DiagnosticReport from './DiagnosticReport';
import fhirVersions from '../fhirResourceVersions';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example1.json';
import example2DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example2.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );
    expect(getByTestId('effectiveDateTime').textContent).toContain('4/2/2013');

    expect(getByTestId('categoryCoding').textContent).toContain('Haematology');
    expect(getByTestId('issued').textContent).toContain('5/15/2013');
    expect(getByTestId('performer').textContent).toContain(
      'University Medical ',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );
    expect(getByTestId('issued').textContent).toContain('5/15/2013');
    expect(getByTestId('categoryCoding').textContent).toContain(
      'Haematology test',
    );

    expect(getByTestId('performer').textContent).toContain(
      'University Medical ',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );
    expect(getByTestId('issued').textContent).toContain('5/15/2013');
    expect(getByTestId('categoryCoding').textContent).toContain(
      'Haematology test',
    );

    expect(getByTestId('performer').textContent).toContain(
      'Burgers University',
    );
  });

  it('should render with R4 source data - example2', () => {
    const defaultProps = {
      fhirResource: example2DiagnosticReportR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Culture, MRSA');
    expect(getByTestId('issued').textContent).toContain('8/10/2009');
    expect(getByTestId('categoryCoding').textContent).toContain('(MB)');

    expect(getByTestId('performer').textContent).toContain('Todd Ashby');
  });
});
