import React from 'react';
import { object } from '@storybook/addon-knobs';

import ResearchStudy from './ResearchStudy';

import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';

export default {
  title: 'ResearchStudy',
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <ResearchStudy fhirVersion="stu3" fhirResource={fhirResource} />;
};
