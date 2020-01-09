import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';

export default {
  title: 'MedicationAdministration',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationAdministration fhirVersion="dstu2" fhirResource={fhirResource} />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationAdministration fhirVersion="stu3" fhirResource={fhirResource} />
  );
};
