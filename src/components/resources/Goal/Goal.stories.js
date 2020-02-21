import React from 'react';
import { object } from '@storybook/addon-knobs';

import Goal from './Goal';

import dstu2Example1 from '../../../fixtures/dstu2/resources/goal/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/goal/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/goal/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/goal/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/goal/example2.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'Goal',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Goal fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <Goal fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />;
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Goal fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Goal fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Goal fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Goal fhirResource={fhirResource} />;
};
