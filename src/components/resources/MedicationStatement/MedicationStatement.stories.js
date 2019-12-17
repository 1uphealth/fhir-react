import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationStatement from './MedicationStatement';

import example1 from '../../../fixtures/dstu2/resources/MedicationStatement/example1.json';

export default {
  title: 'MedicationStatement',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return (
    <MedicationStatement fhirVersion="dstu2" fhirResource={fhirResource} />
  );
};
