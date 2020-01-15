import React from 'react';
import { object } from '@storybook/addon-knobs';

import FamilyMemberHistory from './FamilyMemberHistory';
import fhirTypes from '../fhirResourceTypes';

import example1DSTU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';

import example1STU3 from '../../../fixtures/stu3/resources/familyMemberHistory/example1.json';

export default {
  title: 'FamilyMemberHistory',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1DSTU2);
  return (
    <FamilyMemberHistory
      fhirVersion={fhirTypes.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', example1STU3);
  return (
    <FamilyMemberHistory
      fhirVersion={fhirTypes.STU3}
      fhirResource={fhirResource}
    />
  );
};
