import React from 'react';
import { object } from '@storybook/addon-knobs';

import RelatedPerson from './RelatedPerson';

import example1RelatedPerson from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import example2RelatedPersonDSTU2 from '../../../fixtures/dstu2/resources/relatedPerson/example2.json';

import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'RelatedPerson' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1RelatedPerson);
  return <RelatedPerson fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', example2RelatedPersonDSTU2);
  return <RelatedPerson fhirResource={fhirResource} />;
};
