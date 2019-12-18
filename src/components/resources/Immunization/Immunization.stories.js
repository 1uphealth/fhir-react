import React from 'react';
import { object } from '@storybook/addon-knobs';

import Immunization from './Immunization';

import example1 from '../../../fixtures/dstu2/resources/immunization/example1.json';

export default {
  title: 'Immunization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return <Immunization fhirResource={fhirResource} />;
};
