import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DiagnosticReport from './DiagnosticReport';
import fhirVersions from '../fhirResourceVersions';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example1.json';
import example2DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example2.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<DiagnosticReport {...defaultProps} />);
    const headerIcon = getByAltText('diagnostic report');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/DiagnosticReport/diagnostic-report.svg')}
          alt="diagnostic report"
        />
      ),
    };

    const { getByAltText } = render(<DiagnosticReport {...defaultProps} />);
    const headerIcon = getByAltText('diagnostic report');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<DiagnosticReport {...defaultProps} />);
    const headerIcon = getByAltText('diagnostic report');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<DiagnosticReport {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleDiagnosticReportDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<DiagnosticReport {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'blood count (hemogram)',
    );
    expect(getByTestId('effectiveDateTime').textContent).toContain(
      '04/02/2013',
    );

    expect(getByTestId('categoryCoding').textContent).toContain('Haematology');
    expect(getByTestId('issued').textContent).toContain('05/15/2013');
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

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2DiagnosticReportR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <DiagnosticReport {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2DiagnosticReportR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <DiagnosticReport {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
