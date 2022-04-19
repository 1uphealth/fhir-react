import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Claim from './Claim';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/claim/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claim/example-1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/claim/example-2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/claim/example-3.json';

import r4Example1 from '../../../fixtures/r4/resources/claim/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/claim/example2.json';
import ClaimIcon from '../../../assets/containers/Claim/claim.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Claim',
  component: Claim,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Claim {...args} />;

export const ExampleOfDSTU2 = Template.bind({});
ExampleOfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Claim/claim.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: ClaimIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
  fhirIcons: fhirIcons,
};

export const Example3OfSTU3 = Template.bind({});
Example3OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example3,
  fhirIcons: false,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: 'random text',
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
};
