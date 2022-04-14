import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import AdverseEvent from './AdverseEvent';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/adverseEvent/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'AdverseEvent',
  component: AdverseEvent,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <AdverseEvent {...args} />;

export const DefaultVisualizationSTU3 = Template.bind({});
DefaultVisualizationSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: fhirIcons,
};

export const Example1ofR4 = Template.bind({});

Example1ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: false,
};
