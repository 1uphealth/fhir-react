import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationStatement from './MedicationStatement';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationStatement/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationStatement/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationStatement/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationStatement/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationStatement/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationStatementIcon from '../../../assets/containers/MedicationStatement/medication-statement.svg';

export default {
  title: 'MedicationStatement',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <MedicationStatement
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/MedicationStatement/medication-statement.svg')}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <MedicationStatement
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={MedicationStatementIcon}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <MedicationStatement
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <MedicationStatement
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <MedicationStatement
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};
