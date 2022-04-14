import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';
import fhirVersions from '../fhirResourceVersions';

import Appointment from './Appointment';

import exampleAppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example1.json';
import example2AppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example2.json';
import example1AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example1.json';
import example2AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example2.json';
import example3AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example3.json';
import example1AppointmentR4 from '../../../fixtures/r4/resources/appointment/example1.json';
import example2AppointmentR4 from '../../../fixtures/r4/resources/appointment/example2.json';
import example3AppointmentR4 from '../../../fixtures/r4/resources/appointment/example3.json';

import fhirIcons from '../../../fixtures/example-icons';
import AppointmentIcon from '../../../assets/containers/Appointment/appointment.svg';

export default {
  title: 'Appointment',
  component: Appointment,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Appointment {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: exampleAppointmentDSTU2,
  fhirVersion: fhirVersions.DSTU2,
  fhirIcons: require('../../../assets/containers/Appointment/appointment.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirResource: example2AppointmentDSTU2,
  fhirVersion: fhirVersions.DSTU2,
  fhirIcons: AppointmentIcon,
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirResource: example1AppointmentSTU3,
  fhirVersion: fhirVersions.STU3,
  fhirIcons: fhirIcons,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirResource: example2AppointmentSTU3,
  fhirVersion: fhirVersions.STU3,
  fhirIcons: false,
};

export const Example3OfSTU3 = Template.bind({});
Example3OfSTU3.args = {
  fhirResource: example3AppointmentSTU3,
  fhirVersion: fhirVersions.STU3,
  fhirIcons: 'random text',
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirResource: example1AppointmentR4,
  fhirVersion: fhirVersions.R4,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirResource: example2AppointmentR4,
  fhirVersion: fhirVersions.R4,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirResource: example3AppointmentR4,
  fhirVersion: fhirVersions.R4,
};
