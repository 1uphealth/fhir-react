import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import CareTeam from './CareTeam';
import fhirVersions from '../fhirResourceVersions';
import example_STU3 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/careTeam/example2.json';
import example_R4 from '../../../fixtures/r4/resources/careTeam/example1.json';

import fhirIcons from '../../../fixtures/example-icons';
import CareTeamIcon from '../../../assets/containers/CareTeam/care-team.svg';

export default {
  title: 'CareTeam',
  component: CareTeam,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <CareTeam {...args} />;

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example_STU3,
  fhirIcons: CareTeamIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2_STU3,
  fhirIcons: fhirIcons,
};

export const ExampleR4 = Template.bind({});
ExampleR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example_R4,
  fhirIcons: false,
};
