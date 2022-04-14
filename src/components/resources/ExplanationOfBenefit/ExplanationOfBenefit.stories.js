import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import fhirVersions from '../fhirResourceVersions';

import example1Dstu2 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';
import example2R4 from '../../../fixtures/r4/resources/explanationOfBenefit/eobForClaimWithErrors.json';
import exampleC4BB from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExample.json';
import exampleC4BBExtendedDiagnosis from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExtendedDiagnosis.json';

import fhirIcons from '../../../fixtures/example-icons';
import ExplanationOfBenefitIcon from '../../../assets/containers/ExplanationOfBenefit/explanation-of-benefit.svg';

export default {
  title: 'ExplanationOfBenefit',
  component: ExplanationOfBenefit,
  argTypes: {
    ...defaultArgTypes,
    withCarinBBProfile: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <ExplanationOfBenefit {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1Dstu2,
  fhirIcons: require('../../../assets/containers/ExplanationOfBenefit/explanation-of-benefit.svg'),
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example1Stu3,
  fhirIcons: ExplanationOfBenefitIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2Stu3,
  fhirIcons: fhirIcons,
};

export const PersonPrimaryCoverageR4 = Template.bind({});
PersonPrimaryCoverageR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1R4,
  fhirIcons: false,
};

export const EOBForClaimWithErrorsR4 = Template.bind({});
EOBForClaimWithErrorsR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2R4,
  fhirIcons: 'random text',
};

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: example1Stu3,
};
export const EOBCarinBlueButtonExample = Template.bind({});
EOBCarinBlueButtonExample.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: exampleC4BB,
  withCarinBBProfile: true,
};
export const EOBCarinBlueButtonExtendedDiagnosis = Template.bind({});
EOBCarinBlueButtonExtendedDiagnosis.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: exampleC4BBExtendedDiagnosis,
  withCarinBBProfile: true,
};
