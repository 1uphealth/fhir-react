import React from 'react';
import { object } from '@storybook/addon-knobs';

import DiagnosticReport from './DiagnosticReport';
import fhirVersions from '../fhirResourceVersions';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example1.json';
import example2DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example2.json';
import example3DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'DiagnosticReport' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportDSTU2);
  return (
    <DiagnosticReport
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleDiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportSTU3);
  return (
    <DiagnosticReport
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleDiagnosticReportR4 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportR4);
  return (
    <DiagnosticReport
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2DiagnosticReportR4 = () => {
  const fhirResource = object('Resource', example2DiagnosticReportR4);
  return (
    <DiagnosticReport
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example3DiagnosticReportR4 = () => {
  const fhirResource = object('Resource', example3DiagnosticReportR4);
  return (
    <DiagnosticReport
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportSTU3);
  return <DiagnosticReport fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};
