import React from 'react';
import { object } from '@storybook/addon-knobs';

import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';

import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example2PatientSTU3 from '../../../fixtures/stu3/resources/patient/example2.json';

export default { title: 'Patient' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', examplePatient);
  return <Patient fhirResource={fhirResource} />;
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', examplePatientSTU3);
  return <Patient fhirResource={fhirResource} />;
};

export const Example2STU3 = () => {
  const fhirResource = object('Resource', example2PatientSTU3);
  return <Patient fhirResource={fhirResource} />;
};
