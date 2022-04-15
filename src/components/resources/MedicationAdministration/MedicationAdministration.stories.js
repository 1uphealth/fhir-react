import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationAdministration/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationAdministration/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medicationAdministration/example3.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationAdministrationIcon from '../../../assets/containers/MedicationAdministration/medication-administration.svg';

export default {
  title: 'MedicationAdministration',
  component: MedicationAdministration,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <MedicationAdministration {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/MedicationAdministration/medication-administration.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: MedicationAdministrationIcon,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: fhirIcons,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
  fhirIcons: false,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example3,
  fhirIcons: 'random text',
};
