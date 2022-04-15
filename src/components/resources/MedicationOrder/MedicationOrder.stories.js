import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import MedicationOrder from './MedicationOrder';

import dstu2Example from '../../../fixtures/dstu2/resources/medicationOrder/example.json';

export default {
  title: 'MedicationOrder',
  component: MedicationOrder,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <MedicationOrder {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: dstu2Example,
  fhirIcons: require('../../../assets/containers/MedicationOrder/medication-order.svg'),
};
