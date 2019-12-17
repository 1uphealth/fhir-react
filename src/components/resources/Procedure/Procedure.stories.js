import React from 'react';
import { object } from '@storybook/addon-knobs';

import Procedure from './Procedure';

import example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';

export default { title: 'Procedure' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return <Procedure fhirResource={fhirResource} />;
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Procedure fhirResource={fhirResource} />;
};
