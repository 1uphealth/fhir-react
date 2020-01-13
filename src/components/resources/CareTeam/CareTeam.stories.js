import React from 'react';
import { object } from '@storybook/addon-knobs';

import CareTeam from './CareTeam';

import example_STU3 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/careTeam/example2.json';

export default {
  title: 'CareTeam',
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example_STU3);
  return <CareTeam fhirResource={fhirResource} />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', example2_STU3);
  return <CareTeam fhirResource={fhirResource} />;
};
