import React from 'react';
import { object } from '@storybook/addon-knobs';

import Organization from './Organization';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

export default {
  title: 'Organization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Organization fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <Organization fhirResource={fhirResource} />;
};
