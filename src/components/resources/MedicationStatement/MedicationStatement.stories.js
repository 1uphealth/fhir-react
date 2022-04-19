import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationStatement from './MedicationStatement';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationStatement/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationStatement/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationStatement/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationStatement/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationStatement/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationStatementIcon from '../../../assets/containers/MedicationStatement/medication-statement.svg';

export default {
  title: 'MedicationStatement',
  component: MedicationStatement,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <MedicationStatement {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/MedicationStatement/medication-statement.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: MedicationStatementIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
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
