import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';

export default { title: 'Observation', decorators: [withKnobs] };

export const DefaultVisualizationDSTU2 = () => {
  const data = object('Resource', exampleObservationIssued);
  const fhirResource = JSON.parse(JSON.stringify(data)); // hack

  return <Observation fhirResource={fhirResource} />;
};

export const ExampleWithoutIssuedDSTU2 = () => {
  return <Observation fhirResource={exampleObservation} />;
};

export const ExampleWithIssuedSTU3 = () => {
  return <Observation fhirResource={exampleObservationExcessSTU3} />;
};

export const ExampleWithoutIssuedSTU3 = () => {
  return <Observation fhirResource={exampleObservationSTU3} />;
};
