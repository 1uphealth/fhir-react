import React from 'react';
import { object } from '@storybook/addon-knobs';

import Medication from './Medication';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medication/example2.json';

export default {
  title: 'Medication',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Medication fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <Medication fhirResource={fhirResource} />;
};
