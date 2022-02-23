import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationDispense from './MedicationDispense';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medicationDispense/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationDispense/example2.json';
import R4Example1 from '../../../fixtures/r4/resources/medicationDispense/example1.json';
import R4Example2 from '../../../fixtures/r4/resources/medicationDispense/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationDispenseIcon from '../../../assets/containers/MedicationDispense/medication-dispense.svg';

export default {
  title: 'MedicationDispense',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={require('../../../assets/containers/MedicationDispense/medication-dispense.svg')}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={MedicationDispenseIcon}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={false}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', R4Example1);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={'random text'}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', R4Example2);
  return (
    <MedicationDispense
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <MedicationDispense fhirResource={fhirResource} />;
};
