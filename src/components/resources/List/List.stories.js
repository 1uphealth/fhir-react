import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import List from './List';
import fhirVersions from '../fhirResourceVersions';

import example1Dstu2 from '../../../fixtures/dstu2/resources/list/example1.json';
import example2Dstu2 from '../../../fixtures/dstu2/resources/list/example2.json';
import example3Dstu2 from '../../../fixtures/dstu2/resources/list/example3.json';
import example1Stu3 from '../../../fixtures/stu3/resources/list/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/list/example2.json';
import example3Stu3 from '../../../fixtures/stu3/resources/list/example3.json';
import example1R4 from '../../../fixtures/r4/resources/list/example1.json';
import example2R4 from '../../../fixtures/r4/resources/list/example2.json';
import example3R4 from '../../../fixtures/r4/resources/list/example3.json';

import fhirIcons from '../../../fixtures/example-icons';
import ListIcon from '../../../assets/containers/List/list.svg';

export default {
  title: 'List',
  component: List,
  argTypes: {
    ...defaultArgTypes,
    withDaVinciPDex: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <List {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1Dstu2,
  fhirIcons: require('../../../assets/containers/List/list.svg'),
};

export const Example2DSTU2 = Template.bind({});
Example2DSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example2Dstu2,
  fhirIcons: ListIcon,
};

export const Example3DSTU2 = Template.bind({});
Example3DSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example3Dstu2,
  fhirIcons: fhirIcons,
};

export const DefaultVisualizationSTU3 = Template.bind({});
DefaultVisualizationSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example1Stu3,
  fhirIcons: false,
};

export const Example2STU3 = Template.bind({});
Example2STU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2Stu3,
  fhirIcons: 'random text',
};

export const Example3STU3 = Template.bind({});
Example3STU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example3Stu3,
};

export const DefaultVisualizationR4 = Template.bind({});
DefaultVisualizationR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1R4,
};

export const ExampleR4WithoutDaVinciPDex = Template.bind({});
ExampleR4WithoutDaVinciPDex.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2R4,
};

export const ExampleR4WithDaVinciPDex = Template.bind({});
ExampleR4WithDaVinciPDex.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2R4,
  withDaVinciPDex: true,
};

export const Example2R4 = Template.bind({});
Example2R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3R4,
};

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: example3R4,
};
