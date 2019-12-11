import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';

import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';

export default { title: 'Patient', decorators: [withKnobs] };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', examplePatient);
  return <Patient fhirResource={fhirResource} />;
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', examplePatientSTU3);
  return <Patient fhirResource={fhirResource} />;
};
