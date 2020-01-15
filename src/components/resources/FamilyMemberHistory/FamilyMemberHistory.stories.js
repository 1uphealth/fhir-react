import React from 'react';
import { object } from '@storybook/addon-knobs';

import FamilyMemberHistory from './FamilyMemberHistory';

import example1STU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';

export default {
  title: 'FamilyMemberHistory',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1STU2);
  return <FamilyMemberHistory fhirResource={fhirResource} />;
};
