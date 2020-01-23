import React from 'react';
import { object } from '@storybook/addon-knobs';

import fhirVersions from '../fhirResourceVersions';
import ClaimResponse from './ClaimResponse';

import exampleClaimResponseDSTU2 from '../../../fixtures/dstu2/resources/claimResponse/example-1.json';
import exampleClaimResponseSTU3 from '../../../fixtures/stu3/resources/claimResponse/example-1.json';

export default { title: 'Claim Response' };

export const ExampleDSTU2 = () => {
  const fhirResource = object('Resource', exampleClaimResponseDSTU2);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', exampleClaimResponseSTU3);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
    />
  );
};
