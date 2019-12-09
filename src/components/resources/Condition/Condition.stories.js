import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Condition from './Condition';

import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';

import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';

export default { title: 'Condition', decorators: [withKnobs] };

export const DefaultVisualizationDSTU2 = () => {
  const data = object('Resource', exampleConditionSeverity);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Condition fhirResource={fhirResource} />;
};

export const ExampleWithoutSeverityDSTU2 = () => {
  return <Condition fhirResource={exampleCondition} />;
};

export const ExampleWithoutSeveritySTU3 = () => {
  return <Condition fhirResource={exampleConditionSTU3} />;
};

export const ExampleWithSeveritySTU3 = () => {
  return <Condition fhirResource={exampleConditionSeveritySTU3} />;
};
