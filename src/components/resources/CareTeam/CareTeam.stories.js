import React from 'react';
import { object } from '@storybook/addon-knobs';

import CareTeam from './CareTeam';

import example_STU3 from '../../../fixtures/stu3/resources/careTeam/example1.json';

export default {
  title: 'CareTeam',
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example_STU3);
  return <CareTeam fhirResource={fhirResource} />;
};
