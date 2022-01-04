import React from 'react';
import { object } from '@storybook/addon-knobs';

import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';
import example3ObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example3.json';
import example1ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example1.json';
import example2ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example2.json';
import example3ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example3.json';
import ObservationIcon from '../../../assets/containers/Observation/observation.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'Observation' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleObservationIssued);
  return (
    <Observation
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Observation/observation.svg')}
    />
  );
};

export const ExampleWithoutIssuedDSTU2 = () => {
  const fhirResource = object('Resource', exampleObservation);
  return (
    <Observation fhirResource={fhirResource} fhirIcons={ObservationIcon} />
  );
};

export const ExampleWithIssuedSTU3 = () => {
  const fhirResource = object('Resource', exampleObservationExcessSTU3);
  return <Observation fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};

export const ExampleWithoutIssuedSTU3 = () => {
  const fhirResource = object('Resource', exampleObservationSTU3);
  return <Observation fhirResource={fhirResource} fhirIcons={false} />;
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', example3ObservationExcessSTU3);
  return <Observation fhirResource={fhirResource} fhirIcons={'random text'} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', example1ObservationExcessR4);
  return <Observation fhirResource={fhirResource} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', example2ObservationExcessR4);
  return <Observation fhirResource={fhirResource} />;
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', example3ObservationExcessR4);
  return <Observation fhirResource={fhirResource} />;
};
