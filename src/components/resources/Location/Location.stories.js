import React from 'react';
import { object } from '@storybook/addon-knobs';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/location/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/location/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/location/example2.json';

export default {
  title: 'Location',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Location fhirResource={fhirResource} />;
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Location fhirResource={fhirResource} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Location fhirResource={fhirResource} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Location fhirResource={fhirResource} />;
};
