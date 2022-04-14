import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Device from './Device';

import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/device/example2.json';
import stu3Example1 from '../../../fixtures/stu3/resources/device/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/device/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/device/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/device/example2.json';
import fhirVersions from '../fhirResourceVersions';
import DeviceIcon from '../../../assets/containers/Device/device.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Device',
  component: Device,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Device {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Device/device.svg'),
};

export const ExampleOfDSTU2 = Template.bind({});
ExampleOfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: DeviceIcon,
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

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: dstu2Example1,
};
