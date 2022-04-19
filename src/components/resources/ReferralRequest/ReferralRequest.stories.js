import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ReferralRequest from './ReferralRequest';

import dstu2Example1 from '../../../fixtures/dstu2/resources/referralRequest/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/referralRequest/example1.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'ReferralRequest',
  component: ReferralRequest,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <ReferralRequest {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
  fhirIcons: require('../../../assets/containers/ReferralRequest/referral-request.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
  fhirIcons: false,
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: stu3Example1,
};
