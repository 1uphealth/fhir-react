import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Condition from './Condition';

import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';

export default { title: 'Condition', decorators: [withKnobs] };

export const DefaultVisualizationDSTU2 = () => {
  const data = object('Resource', exampleConditionSeverity);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Condition fhirResource={fhirResource} />;
};

export const ExampleWithoutSeverityDSTU2 = () => {
  return <Condition fhirResource={exampleCondition} />;
};
