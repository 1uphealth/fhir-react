import React from 'react';
import { object } from '@storybook/addon-knobs';

import DiagnosticReport from './DiagnosticReport';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';

export default { title: 'DiagnosticReport' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportDSTU2);
  return <DiagnosticReport fhirVersion="dstu2" fhirResource={fhirResource} />;
};

export const ExampleDiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportSTU3);
  return <DiagnosticReport fhirVersion="stu3" fhirResource={fhirResource} />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportSTU3);
  return <DiagnosticReport fhirResource={fhirResource} />;
};
