import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationStatement from './MedicationStatement';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationStatement/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationStatement/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationStatement/example2.json';

export default {
  title: 'MedicationStatement',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationStatement fhirVersion="dstu2" fhirResource={fhirResource} />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <MedicationStatement fhirVersion="stu3" fhirResource={fhirResource} />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <MedicationStatement fhirVersion="stu3" fhirResource={fhirResource} />;
};
