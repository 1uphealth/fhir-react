import React from 'react';
import { object } from '@storybook/addon-knobs';

import DiagnosticReport from './DiagnosticReport';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';

export default { title: 'DiagnosticReport' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleDiagnosticReportDSTU2);
  return <DiagnosticReport fhirResource={fhirResource} />;
};
