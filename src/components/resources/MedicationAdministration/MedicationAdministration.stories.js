import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';

export default {
  title: 'MedicationAdministration',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <MedicationAdministration fhirResource={fhirResource} />;
};
