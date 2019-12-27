import React from 'react';
import { render } from '@testing-library/react';
import DiagnosticReport from './DiagnosticReport';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: 'dstu2',
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );
    expect(getByTestId('effectiveDateTime').textContent).toContain(
      '2013-04-02',
    );

    expect(getByTestId('categoryCoding').textContent).toContain('Haematology');

    expect(getByTestId('performer').textContent).toContain(
      'University Medical ',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportSTU3,
      fhirVersion: 'stu3',
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );

    expect(getByTestId('categoryCoding').textContent).toContain(
      'Haematology test',
    );

    expect(getByTestId('performer').textContent).toContain(
      'University Medical ',
    );
  });
});
