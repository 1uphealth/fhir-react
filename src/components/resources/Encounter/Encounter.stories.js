import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Encounter from './Encounter';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';
import example1_R4 from '../../../fixtures/r4/resources/encounter/example1.json';
import example2_R4 from '../../../fixtures/r4/resources/encounter/example2.json';
import example3_R4 from '../../../fixtures/r4/resources/encounter/example3.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';
import EncounterIcon from '../../../assets/containers/Encounter/encounter.svg';

export default {
  title: 'Encounter',
  component: Encounter,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Encounter {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1,
  fhirIcons: require('../../../assets/containers/Encounter/encounter.svg'),
};

export const ExampleWithoutParticipantsDSTU2 = Template.bind({});
ExampleWithoutParticipantsDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example2,
  fhirIcons: EncounterIcon,
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example_STU3,
  fhirIcons: fhirIcons,
};

export const ExampleWithoutParticipantSTU3 = Template.bind({});
ExampleWithoutParticipantSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2_STU3,
  fhirIcons: false,
};

export const ExampleWithoutParticipantR4 = Template.bind({});
ExampleWithoutParticipantR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1_R4,
  fhirIcons: 'random text',
};

export const Example2ofR4 = Template.bind({});
Example2ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2_R4,
};

export const Example3ofR4 = Template.bind({});
Example3ofR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3_R4,
};

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: example2_STU3,
};
