import React from 'react';
import { object } from '@storybook/addon-knobs';

import ReferralRequest from './ReferralRequest';

import dstu2Example1 from '../../../fixtures/dstu2/resources/referralRequest/example1.json';

export default {
  title: 'ReferralRequest',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return <ReferralRequest fhirResource={fhirResource} />;
};
