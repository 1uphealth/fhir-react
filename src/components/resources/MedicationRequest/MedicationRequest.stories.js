import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';
import R4Example1 from '../../../fixtures/r4/resources/medicationRequest/example1.json';
import R4Example2 from '../../../fixtures/r4/resources/medicationRequest/example2.json';
import R4Example3 from '../../../fixtures/r4/resources/medicationRequest/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'MedicationRequest',
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationRequest fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <MedicationRequest fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', R4Example1);
  return (
    <MedicationRequest fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', R4Example2);
  return (
    <MedicationRequest fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', R4Example3);
  return (
    <MedicationRequest fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};
