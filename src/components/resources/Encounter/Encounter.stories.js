import React from 'react';
import { object } from '@storybook/addon-knobs';

import Encounter from './Encounter';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';

export default {
  title: 'Encounter',
};

export const DefaultVisualizationDSTU2 = () => {
  const data = object('Resource', example1);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Encounter fhirVersion="dstu2" fhirResource={fhirResource} />;
};
export const ExampleWithoutParticipantsDSTU2 = () => {
  const data = object('Resource', example2);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Encounter fhirVersion="dstu2" fhirResource={fhirResource} />;
};
export const ExampleSTU3 = () => {
  const data = object('Resource', example_STU3);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Encounter fhirVersion="stu3" fhirResource={fhirResource} />;
};
export const ExampleWithoutParticipantSTU3 = () => {
  const data = object('Resource', example2_STU3);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Encounter fhirVersion="stu3" fhirResource={fhirResource} />;
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const data = object('Resource', example2_STU3);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Encounter fhirResource={fhirResource} />;
};
