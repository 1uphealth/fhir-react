import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Medication from './Medication';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/medication/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medication/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medication/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medication/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medication/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medication/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationIcon from '../../../assets/containers/Medication/medication.svg';

export default {
  title: 'Medication',
  component: Medication,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Medication {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Medication/medication.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: MedicationIcon,
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
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
  fhirResource: r4Example1,
  fhirIcons: 'random text',
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example3,
};
