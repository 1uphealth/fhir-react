import React from 'react';
import { object } from '@storybook/addon-knobs';

import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';
import example3ObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example3.json';

export default { title: 'Observation' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleObservationIssued);
  return <Observation fhirResource={fhirResource} />;
};

export const ExampleWithoutIssuedDSTU2 = () => {
  const fhirResource = object('Resource', exampleObservation);
  return <Observation fhirResource={fhirResource} />;
};

export const ExampleWithIssuedSTU3 = () => {
  const fhirResource = object('Resource', exampleObservationExcessSTU3);
  return <Observation fhirResource={fhirResource} />;
};

export const ExampleWithoutIssuedSTU3 = () => {
  const fhirResource = object('Resource', exampleObservationSTU3);
  return <Observation fhirResource={fhirResource} />;
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', example3ObservationExcessSTU3);
  return <Observation fhirResource={fhirResource} />;
};
