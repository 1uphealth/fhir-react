import React from 'react';
import { object } from '@storybook/addon-knobs';

import Device from './Device';

import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/device/example2.json';

export default {
  title: 'Device',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Device fhirResource={fhirResource} />;
};

export const ExampleOfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <Device fhirResource={fhirResource} />;
};
