import React from 'react';
import { object } from '@storybook/addon-knobs';

import ExplanationOfBenefit from './ExplanationOfBenefit';

import example1Dstu2 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';

export default {
  title: 'ExplanationOfBenefit',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1Dstu2);
  return <ExplanationOfBenefit fhirResource={fhirResource} />;
};
