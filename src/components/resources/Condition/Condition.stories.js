import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';
import fhirVersions from '../fhirResourceVersions';

import Condition from './Condition';

import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import example3Condition from '../../../fixtures/dstu2/resources/condition/example3.json';

import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';

import example1ConditionR4 from '../../../fixtures/r4/resources/condition/example1.json';
import example2ConditionR4 from '../../../fixtures/r4/resources/condition/example2.json';
import example3ConditionR4 from '../../../fixtures/r4/resources/condition/example3.json';

import fhirIcons from '../../../fixtures/example-icons';
import ConditionIcon from '../../../assets/containers/Condition/condition.svg';

export default {
  title: 'Condition',
  component: Condition,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Condition {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleConditionSeverity,
  fhirIcons: require('../../../assets/containers/Condition/condition.svg'),
};

export const ExampleWithoutSeverityDSTU2 = Template.bind({});
ExampleWithoutSeverityDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleCondition,
  fhirIcons: ConditionIcon,
};

export const Example3OfDSTU2 = Template.bind({});
Example3OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example3Condition,
  fhirIcons: fhirIcons,
};

export const ExampleWithoutSeveritySTU3 = Template.bind({});
ExampleWithoutSeveritySTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleConditionSTU3,
  fhirIcons: false,
};

export const ExampleWithSeveritySTU3 = Template.bind({});
ExampleWithSeveritySTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleConditionSeveritySTU3,
  fhirIcons: 'random text',
};

export const Example1ofR4 = Template.bind({});
Example1ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1ConditionR4,
};

export const Example2ofR4 = Template.bind({});
Example2ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2ConditionR4,
};

export const Example3ofR4 = Template.bind({});
Example3ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3ConditionR4,
};
