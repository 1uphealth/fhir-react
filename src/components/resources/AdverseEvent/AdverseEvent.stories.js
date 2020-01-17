import React from 'react';
import { object } from '@storybook/addon-knobs';

import AdverseEvent from './AdverseEvent';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';

export default {
  title: 'AdverseEvent',
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <AdverseEvent fhirResource={fhirResource} />;
};
