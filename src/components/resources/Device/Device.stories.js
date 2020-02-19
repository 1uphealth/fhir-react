import React from 'react';
import { object } from '@storybook/addon-knobs';

import Device from './Device';

import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/device/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/device/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/device/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/device/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/device/example2.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'Device',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Device fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const ExampleOfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Device fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Device fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};
export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <Device fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Device fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Device fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <Device fhirResource={fhirResource} />;
};
