import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ResearchStudy from './ResearchStudy';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/researchStudy/example-1.json';
import r4Example1 from '../../../fixtures/r4/resources/researchStudy/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'ResearchStudy',
  component: ResearchStudy,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <ResearchStudy {...args} />;

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: fhirIcons,
};

export const ExampleOfR4 = Template.bind({});
ExampleOfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: false,
};
