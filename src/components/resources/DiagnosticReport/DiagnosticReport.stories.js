import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import DiagnosticReport from './DiagnosticReport';
import fhirVersions from '../fhirResourceVersions';

import exampleDiagnosticReportDSTU2 from '../../../fixtures/dstu2/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportSTU3 from '../../../fixtures/stu3/resources/diagnosticReport/example1.json';
import exampleDiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example1.json';
import example2DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example2.json';
import example3DiagnosticReportR4 from '../../../fixtures/r4/resources/diagnosticReport/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import DiagnosticReportIcon from '../../../assets/containers/DiagnosticReport/diagnostic-report.svg';

export default {
  title: 'DiagnosticReport',
  component: DiagnosticReport,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <DiagnosticReport {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleDiagnosticReportDSTU2,
  fhirIcons: require('../../../assets/containers/DiagnosticReport/diagnostic-report.svg'),
};

export const ExampleDiagnosticReportSTU3 = Template.bind({});
ExampleDiagnosticReportSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleDiagnosticReportSTU3,
  fhirIcons: DiagnosticReportIcon,
};

export const ExampleDiagnosticReportR4 = Template.bind({});
ExampleDiagnosticReportR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: exampleDiagnosticReportR4,
  fhirIcons: fhirIcons,
};

export const Example2DiagnosticReportR4 = Template.bind({});
Example2DiagnosticReportR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2DiagnosticReportR4,
  fhirIcons: false,
};

export const Example3DiagnosticReportR4 = Template.bind({});
Example3DiagnosticReportR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3DiagnosticReportR4,
  fhirIcons: 'random text',
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: exampleDiagnosticReportSTU3,
};
