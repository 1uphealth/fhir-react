import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import example2PatientDSTU2 from '../../../fixtures/dstu2/resources/patient/example2.json';

import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example2PatientSTU3 from '../../../fixtures/stu3/resources/patient/example2.json';

import example1PatientR4 from '../../../fixtures/r4/resources/patient/example1.json';
import example2PatientR4 from '../../../fixtures/r4/resources/patient/example2.json';
import example3PatientR4 from '../../../fixtures/r4/resources/patient/example3.json';
import PatientIcon from '../../../assets/containers/Patient/patient.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Patient',
  component: Patient,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Patient {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: examplePatient,
  fhirIcons: require('../../../assets/containers/Patient/patient.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirResource: example2PatientDSTU2,
  fhirIcons: PatientIcon,
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirResource: examplePatientSTU3,
  fhirIcons: fhirIcons,
};

export const Example2STU3 = Template.bind({});
Example2STU3.args = {
  fhirResource: example2PatientSTU3,
  fhirIcons: false,
};

export const Example1R4 = Template.bind({});
Example1R4.args = {
  fhirResource: example1PatientR4,
  fhirIcons: 'random text',
};

export const Example2R4 = Template.bind({});
Example2R4.args = {
  fhirResource: example2PatientR4,
};

export const Example3R4 = Template.bind({});
Example3R4.args = {
  fhirResource: example3PatientR4,
};
