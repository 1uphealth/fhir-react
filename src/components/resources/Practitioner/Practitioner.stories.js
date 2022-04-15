import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Practitioner from './Practitioner';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/practitioner/example-2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';

import r4Example1 from '../../../fixtures/r4/resources/practitioner/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitioner/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/practitioner/example3.json';
import PractitionerIcon from '../../../assets/containers/Practitioner/practitioner.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Practitioner',
  component: Practitioner,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Practitioner {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Practitioner/practitioner.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: PractitionerIcon,
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
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
