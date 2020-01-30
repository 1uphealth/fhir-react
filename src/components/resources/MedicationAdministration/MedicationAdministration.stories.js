import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
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
