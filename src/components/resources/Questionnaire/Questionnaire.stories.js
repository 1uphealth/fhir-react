import React from 'react';
import { object } from '@storybook/addon-knobs';

import Questionnaire from './Questionnaire';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaire/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaire/example2.json';
import dstu2Example3 from '../../../fixtures/dstu2/resources/questionnaire/example3.json';

export default { title: 'Questionnaire' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <Questionnaire fhirResource={fhirResource} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return <Questionnaire fhirResource={fhirResource} />;
};

export const Example3OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example3);
  return <Questionnaire fhirResource={fhirResource} />;
};
