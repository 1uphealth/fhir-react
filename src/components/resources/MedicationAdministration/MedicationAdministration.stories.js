import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationAdministration/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationAdministration/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medicationAdministration/example3.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationAdministrationIcon from '../../../assets/containers/MedicationAdministration/medication-administration.svg';

export default {
  title: 'MedicationAdministration',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/MedicationAdministration/medication-administration.svg')}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={MedicationAdministrationIcon}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <MedicationAdministration
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};
