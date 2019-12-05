import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

export default { title: 'Observation DSTU2', decorators: [withKnobs] };

export const DefaultVisualization = () => {
  const data = object('Resource', exampleObservationIssued);
  const mockResource2 = JSON.parse(JSON.stringify(data)); // hack

  return <Observation fhirResource={mockResource2} />;
};

export const ExampleWithoutIssued = () => {
  return <Observation fhirResource={exampleObservation} />;
};
