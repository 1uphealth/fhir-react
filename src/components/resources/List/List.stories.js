import React from 'react';
import { object } from '@storybook/addon-knobs';

import List from './List';
import fhirVersions from '../fhirResourceVersions';

import example1Dstu2 from '../../../fixtures/dstu2/resources/list/example1.json';
import example2Dstu2 from '../../../fixtures/dstu2/resources/list/example2.json';
import example3Dstu2 from '../../../fixtures/dstu2/resources/list/example3.json';
import example1Stu3 from '../../../fixtures/stu3/resources/list/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/list/example2.json';
import example3Stu3 from '../../../fixtures/stu3/resources/list/example3.json';
import example1R4 from '../../../fixtures/r4/resources/list/example1.json';
import example2R4 from '../../../fixtures/r4/resources/list/example2.json';
import example3R4 from '../../../fixtures/r4/resources/list/example3.json';

export default {
  title: 'List',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1Dstu2);
  return <List fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />;
};

export const Example2DSTU2 = () => {
  const fhirResource = object('Resource', example2Dstu2);
  return <List fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />;
};
export const Example3DSTU2 = () => {
  const fhirResource = object('Resource', example3Dstu2);
  return <List fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />;
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', example1Stu3);
  return <List fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />;
};

export const Example2STU3 = () => {
  const fhirResource = object('Resource', example2Stu3);
  return <List fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />;
};
export const Example3STU3 = () => {
  const fhirResource = object('Resource', example3Stu3);
  return <List fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />;
};

export const DefaultVisualizationR4 = () => {
  const fhirResource = object('Resource', example1R4);
  return <List fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};
export const ExampleR4WithoutDaVinciPDex = () => {
  const fhirResource = object('Resource', example2R4);
  return <List fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};
export const ExampleR4WithDaVinciPDex = () => {
  const fhirResource = object('Resource', example2R4);
  return (
    <List
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      withDaVinciPDex
    />
  );
};
export const Example2R4 = () => {
  const fhirResource = object('Resource', example3R4);
  return <List fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example3R4);
  return <List fhirResource={fhirResource} />;
};
