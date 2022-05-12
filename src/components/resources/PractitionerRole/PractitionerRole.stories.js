import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import PractitionerRole from './PractitionerRole';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/practitionerRole/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/practitionerRole/example2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/practitionerRole/example3.json';

import r4Example1 from '../../../fixtures/r4/resources/practitionerRole/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitionerRole/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/practitionerRole/example3.json';
import r4Example4 from '../../../fixtures/r4/resources/practitionerRole/example4.json';
import fhirIcons from '../../../fixtures/example-icons';
import PractitionerRoleIcon from '../../../assets/containers/PractitionerRole/practitioner-role.svg';

export default {
  title: 'Practitioner/PractitionerRole',
  component: PractitionerRole,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <PractitionerRole {...args} />;

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: require('../../../assets/containers/PractitionerRole/practitioner-role.svg'),
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
  fhirIcons: PractitionerRoleIcon,
};

export const Example3OfSTU3 = Template.bind({});
Example3OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example3,
  fhirIcons: fhirIcons,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: false,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
  fhirIcons: 'random text',
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example3,
};

export const Example4OfR4 = Template.bind({});
Example4OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example4,
};
