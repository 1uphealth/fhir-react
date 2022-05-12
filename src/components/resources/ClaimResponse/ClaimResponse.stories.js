import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import fhirVersions from '../fhirResourceVersions';
import ClaimResponse from './ClaimResponse';

import exampleClaimResponseDSTU2 from '../../../fixtures/dstu2/resources/claimResponse/example-1.json';
import exampleClaimResponseSTU3 from '../../../fixtures/stu3/resources/claimResponse/example-1.json';
import example2ClaimResponseSTU3 from '../../../fixtures/stu3/resources/claimResponse/example-2.json';
import example1ClaimResponseR4 from '../../../fixtures/r4/resources/claimResponse/example1.json';
import example2ClaimResponseR4 from '../../../fixtures/r4/resources/claimResponse/example2.json';
import example3ClaimResponseR4 from '../../../fixtures/r4/resources/claimResponse/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import ClaimResponseIcon from '../../../assets/containers/ClaimResponse/claim-response.svg';

export default {
  title: 'ExplanationOfBenefit/ClaimResponse',
  component: ClaimResponse,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <ClaimResponse {...args} />;

export const ExampleDSTU2 = Template.bind({});
ExampleDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleClaimResponseDSTU2,
  fhirIcons: require('../../../assets/containers/ClaimResponse/claim-response.svg'),
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleClaimResponseSTU3,
  fhirIcons: ClaimResponseIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2ClaimResponseSTU3,
  fhirIcons: fhirIcons,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1ClaimResponseR4,
  fhirIcons: false,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2ClaimResponseR4,
  fhirIcons: 'random text',
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3ClaimResponseR4,
};
