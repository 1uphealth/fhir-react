import React from 'react';
import { object } from '@storybook/addon-knobs';

import CarePlan from './CarePlan';

import exampleCarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';

export default { title: 'CarePlan' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCarePlanDSTU2);
  return <CarePlan fhirResource={fhirResource} />;
};
