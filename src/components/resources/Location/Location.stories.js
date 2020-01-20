import React from 'react';
import { object } from '@storybook/addon-knobs';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';

export default {
  title: 'Location',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Location fhirResource={fhirResource} />;
};
