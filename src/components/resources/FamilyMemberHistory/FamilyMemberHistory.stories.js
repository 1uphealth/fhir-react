import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import FamilyMemberHistory from './FamilyMemberHistory';
import fhirVersions from '../fhirResourceVersions';

import example1DSTU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';

import example1STU3 from '../../../fixtures/stu3/resources/familyMemberHistory/example1.json';
import example2STU3 from '../../../fixtures/stu3/resources/familyMemberHistory/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import FamilyMemberHistoryIcon from '../../../assets/containers/FamilyMemberHistory/family-member-history.svg';

export default {
  title: 'FamilyMemberHistory',
  component: FamilyMemberHistory,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <FamilyMemberHistory {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1DSTU2,
  fhirIcons: require('../../../assets/containers/FamilyMemberHistory/family-member-history.svg'),
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example1STU3,
  fhirIcons: FamilyMemberHistoryIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2STU3,
  fhirIcons: fhirIcons,
};
