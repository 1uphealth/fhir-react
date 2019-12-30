import React from 'react';
import { object } from '@storybook/addon-knobs';

import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';

export default { title: 'AllergyIntolerance' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleAllergyIntoleranceDSTU2);
  return <AllergyIntolerance fhirResource={fhirResource} />;
};
