import React from 'react';
import { object } from '@storybook/addon-knobs';

import Coverage from './Coverage';

import exampleCoverageDstu2 from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';

export default { title: 'Coverage' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCoverageDstu2);
  return <Coverage fhirVersion="dstu2" fhirResource={fhirResource} />;
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', exampleCoverageStu3);
  return <Coverage fhirVersion="stu3" fhirResource={fhirResource} />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', exampleCoverageStu3);
  return <Coverage fhirResource={fhirResource} />;
};
