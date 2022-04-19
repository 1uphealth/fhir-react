import React from 'react';
import fhirVersions from '../fhirResourceVersions';
import { defaultArgTypes } from '../../defaultArgTypes';

import CarePlan from './CarePlan';

import exampleCarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';
import exampleCarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example1.json';
import example2CarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example2.json';
import weightLossCarePlanR4 from '../../../fixtures/r4/resources/carePlan/weightLossPlan.json';
import pregnancyCarePlanR4 from '../../../fixtures/r4/resources/carePlan/pregnancyPlan.json';
import heartOperationCarePlanR4 from '../../../fixtures/r4/resources/carePlan/heartOperationPlan.json';

import CarePlanIcon from '../../../assets/containers/CarePlan/care-plan.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'CarePlan',
  component: CarePlan,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <CarePlan {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleCarePlanDSTU2,
  fhirIcons: require('../../../assets/containers/CarePlan/care-plan.svg'),
};

export const ExampleCarePlanSTU3 = Template.bind({});
ExampleCarePlanSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleCarePlanSTU3,
  fhirIcons: CarePlanIcon,
};

export const Example2CarePlanSTU3 = Template.bind({});
Example2CarePlanSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2CarePlanSTU3,
  fhirIcons: fhirIcons,
};

export const WeightLossCarePlanR4 = Template.bind({});
WeightLossCarePlanR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: weightLossCarePlanR4,
  fhirIcons: false,
};

export const PregnancyCarePlanR4 = Template.bind({});
PregnancyCarePlanR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: pregnancyCarePlanR4,
  fhirIcons: 'random text',
};

export const HeartOperatioCarePlanR4 = Template.bind({});
HeartOperatioCarePlanR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: heartOperationCarePlanR4,
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: example2CarePlanSTU3,
};
