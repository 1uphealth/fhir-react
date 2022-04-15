import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Goal from './Goal';
import fhirIcons from '../../../fixtures/example-icons';
import dstu2Example1 from '../../../fixtures/dstu2/resources/goal/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/goal/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/goal/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/goal/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/goal/example2.json';
import fhirVersions from '../fhirResourceVersions';
import GoalIcon from '../../../assets/containers/Goal/goal.svg';

export default {
  title: 'Goal',
  component: Goal,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Goal {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Goal/goal.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: GoalIcon,
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

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: stu3Example1,
};
