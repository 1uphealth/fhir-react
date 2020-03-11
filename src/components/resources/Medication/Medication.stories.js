import React from 'react';
import { object } from '@storybook/addon-knobs';

import Medication from './Medication';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medication/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medication/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medication/example2.json';

export default {
  title: 'Medication',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Medication fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Medication fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Medication fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <Medication fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};
