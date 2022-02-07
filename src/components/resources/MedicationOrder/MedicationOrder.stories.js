import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationOrder from './MedicationOrder';

import dstu2Example from '../../../fixtures/dstu2/resources/medicationOrder/example.json';

export default {
  title: 'MedicationOrder',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example);
  return <MedicationOrder fhirResource={fhirResource} />;
};
