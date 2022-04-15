import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/location/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/location/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/location/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import LocationIcon from '../../../assets/containers/Location/location.svg';

export default {
  title: 'Location',
  component: Location,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Location {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/Location/location.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirResource: stu3Example1,
  fhirIcons: LocationIcon,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirResource: r4Example1,
  fhirIcons: fhirIcons,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirResource: r4Example2,
  fhirIcons: false,
};
