import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationDispense from './MedicationDispense';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medicationDispense/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationDispense/example2.json';

export default {
  title: 'MedicationDispense',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <MedicationDispense fhirResource={fhirResource} fhirVersion="dstu2" />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <MedicationDispense fhirResource={fhirResource} fhirVersion="dstu2" />;
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <MedicationDispense fhirResource={fhirResource} fhirVersion="stu3" />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <MedicationDispense fhirResource={fhirResource} fhirVersion="stu3" />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <MedicationDispense fhirResource={fhirResource} />;
};
