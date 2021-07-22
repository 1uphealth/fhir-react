import React from 'react';
import { object } from '@storybook/addon-knobs';

import List from './List';
import fhirVersions from '../fhirResourceVersions';

import example1R4 from '../../../fixtures/r4/resources/list/example1.json';
import example2R4 from '../../../fixtures/r4/resources/list/example2.json';
import example3R4 from '../../../fixtures/r4/resources/list/example3.json';
// import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
// import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
// import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';
// import example2R4 from '../../../fixtures/r4/resources/explanationOfBenefit/eobForClaimWithErrors.json';
// import exampleC4BB from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExample.json';

export default {
  title: 'List',
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
