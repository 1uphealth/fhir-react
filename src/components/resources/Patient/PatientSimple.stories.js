import React from 'react';
import { object } from '@storybook/addon-knobs';

import PatientSimple from './PatientSimple';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import example2PatientDSTU2 from '../../../fixtures/dstu2/resources/patient/example2.json';

import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example2PatientSTU3 from '../../../fixtures/stu3/resources/patient/example2.json';

import example1PatientR4 from '../../../fixtures/r4/resources/patient/example1.json';
import example2PatientR4 from '../../../fixtures/r4/resources/patient/example2.json';
import example3PatientR4 from '../../../fixtures/r4/resources/patient/example3.json';

export default { title: 'PatientSimple' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', examplePatient);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', example2PatientDSTU2);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', examplePatientSTU3);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const Example2STU3 = () => {
  const fhirResource = object('Resource', example2PatientSTU3);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const Example1R4 = () => {
  const fhirResource = object('Resource', example1PatientR4);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const Example2R4 = () => {
  const fhirResource = object('Resource', example2PatientR4);
  return <PatientSimple fhirResource={fhirResource} />;
};

export const Example3R4 = () => {
  const fhirResource = object('Resource', example3PatientR4);
  return <PatientSimple fhirResource={fhirResource} />;
};
