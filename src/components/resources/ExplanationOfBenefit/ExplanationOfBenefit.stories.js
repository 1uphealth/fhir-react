import React from 'react';
import { object } from '@storybook/addon-knobs';

import ExplanationOfBenefit from './ExplanationOfBenefit';

import example1Dstu2 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import fhirResourceTypes from '../fhirResourceTypes';

export default {
  title: 'ExplanationOfBenefit',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1Dstu2);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirResourceTypes.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example1Stu3);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirResourceTypes.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example1Stu3);
  return <ExplanationOfBenefit fhirResource={fhirResource} />;
};
