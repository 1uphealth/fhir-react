import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationAdministration/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationAdministration/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medicationAdministration/example3.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'MedicationAdministration',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};
