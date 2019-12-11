import React from 'react';
import { object } from '@storybook/addon-knobs';

import Condition from './Condition';

import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';

import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';

export default { title: 'Condition' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleConditionSeverity);
  return <Condition fhirResource={fhirResource} />;
};

export const ExampleWithoutSeverityDSTU2 = () => {
  const fhirResource = object('Resource', exampleCondition);
  return <Condition fhirResource={fhirResource} />;
};

export const ExampleWithoutSeveritySTU3 = () => {
  const fhirResource = object('Resource', exampleConditionSTU3);
  return <Condition fhirResource={fhirResource} />;
};

export const ExampleWithSeveritySTU3 = () => {
  const fhirResource = object('Resource', exampleConditionSeveritySTU3);
  return <Condition fhirResource={fhirResource} />;
};
