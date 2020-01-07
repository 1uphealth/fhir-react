import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';

export default {
  title: 'MedicationRequest',
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <MedicationRequest fhirResource={fhirResource} />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <MedicationRequest fhirResource={fhirResource} />;
};
