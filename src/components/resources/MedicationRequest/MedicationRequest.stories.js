import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';
import R4Example1 from '../../../fixtures/r4/resources/medicationRequest/example1.json';
import R4Example2 from '../../../fixtures/r4/resources/medicationRequest/example2.json';
import R4Example3 from '../../../fixtures/r4/resources/medicationRequest/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationRequestIcon from '../../../assets/containers/MedicationRequest/medication-request.svg';

export default {
  title: 'MedicationRequest',
  component: MedicationRequest,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <MedicationRequest {...args} />;

export const DefaultVisualizationSTU3 = Template.bind({});
DefaultVisualizationSTU3.args = {
  fhirResource: stu3Example1,
  fhirIcons: require('../../../assets/containers/MedicationRequest/medication-request.svg'),
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirResource: stu3Example2,
  fhirIcons: MedicationRequestIcon,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirResource: R4Example1,
  fhirIcons: fhirIcons,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirResource: R4Example2,
  fhirIcons: false,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirResource: R4Example3,
  fhirIcons: 'random text',
};
