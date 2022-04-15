import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import QuestionnaireResponse from './QuestionnaireResponse';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaireResponse/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaireResponse/example2.json';
import dstu2Example3 from '../../../fixtures/dstu2/resources/questionnaireResponse/example3.json';

import stu3Example1 from '../../../fixtures/stu3/resources/questionnaireResponse/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/questionnaireResponse/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/questionnaireResponse/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/questionnaireResponse/example2.json';

import fhirIcons from '../../../fixtures/example-icons';
import QuestionnaireResponseIcon from '../../../assets/containers/QuestionnaireResponse/questionnaire-response.svg';

export default {
  title: 'QuestionnaireResponse',
  component: QuestionnaireResponse,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <QuestionnaireResponse {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/QuestionnaireResponse/questionnaire-response.svg'),
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
  fhirIcons: QuestionnaireResponseIcon,
};

export const Example3OfDSTU2 = Template.bind({});
Example3OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example3,
  fhirIcons: fhirIcons,
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: false,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
  fhirIcons: 'random text',
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
};
