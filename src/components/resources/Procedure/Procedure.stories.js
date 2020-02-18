import React from 'react';
import { object } from '@storybook/addon-knobs';

import Procedure from './Procedure';

import example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/procedure/example-medicare.json';

import r4Example1 from '../../../fixtures/r4/resources/procedure/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/procedure/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/procedure/example3.json';

export default { title: 'Procedure' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return <Procedure fhirResource={fhirResource} />;
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Procedure fhirResource={fhirResource} />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <Procedure fhirResource={fhirResource} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Procedure fhirResource={fhirResource} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Procedure fhirResource={fhirResource} />;
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return <Procedure fhirResource={fhirResource} />;
};
