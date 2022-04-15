import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationDispense from './MedicationDispense';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medicationDispense/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationDispense/example2.json';
import R4Example1 from '../../../fixtures/r4/resources/medicationDispense/example1.json';
import R4Example2 from '../../../fixtures/r4/resources/medicationDispense/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationDispenseIcon from '../../../assets/containers/MedicationDispense/medication-dispense.svg';

export default {
  title: 'MedicationDispense',
  component: MedicationDispense,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <MedicationDispense {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/MedicationDispense/medication-dispense.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: MedicationDispenseIcon,
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: stu3Example1,
  fhirIcons: fhirIcons,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
  fhirIcons: false,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: R4Example1,
  fhirIcons: 'random text',
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: R4Example2,
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: stu3Example1,
};
