import React from 'react';
import { object } from '@storybook/addon-knobs';

import Coverage from './Coverage';

import exampleCoverageDstu2 from '../../../fixtures/dstu2/resources/coverage/example1.json';

export default { title: 'Coverage' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCoverageDstu2);
  return <Coverage fhirResource={fhirResource} />;
};
