import React from 'react';
import { object } from '@storybook/addon-knobs';

import Immunization from './Immunization';

import example1 from '../../../fixtures/dstu2/resources/immunization/example1.json';
import example2 from '../../../fixtures/dstu2/resources/immunization/example2.json';
import stu3Example from '../../../fixtures/stu3/resources/immunization/example1.json';

export default {
  title: 'Immunization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return <Immunization fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', example2);
  return <Immunization fhirResource={fhirResource} />;
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', stu3Example);
  return <Immunization fhirResource={fhirResource} />;
};
