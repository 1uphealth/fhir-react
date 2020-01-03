import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationDispense from './MedicationDispense';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medicationDispense/example2.json';

export default {
  title: 'MedicationDispense',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <MedicationDispense fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <MedicationDispense fhirResource={fhirResource} />;
};
