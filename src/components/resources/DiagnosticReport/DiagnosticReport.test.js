import React from 'react';
import { render } from '@testing-library/react';
import DiagnosticReport from './DiagnosticReport';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';

describe('should render component correctly', () => {
  it('DSTU2 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
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
});
