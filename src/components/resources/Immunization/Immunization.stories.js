import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Immunization from './Immunization';

import fhirVersions from '../fhirResourceVersions';
import example1 from '../../../fixtures/dstu2/resources/immunization/example1.json';
import example2 from '../../../fixtures/dstu2/resources/immunization/example2.json';
import stu3Example from '../../../fixtures/stu3/resources/immunization/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/immunization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/immunization/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/immunization/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import ImmunizationIcon from '../../../assets/containers/Immunization/immunization.svg';

export default {
  title: 'Immunization',
  component: Immunization,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Immunization {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1,
  fhirIcons: require('../../../assets/containers/Immunization/immunization.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example2,
  fhirIcons: ImmunizationIcon,
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example,
  fhirIcons: fhirIcons,
};

export const Example1R4 = Template.bind({});
Example1R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
  fhirIcons: false,
};

export const Example2R4 = Template.bind({});
Example2R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
  fhirIcons: 'random text',
};

export const Example3R4 = Template.bind({});
Example3R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example3,
};
