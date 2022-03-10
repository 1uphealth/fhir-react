import React from 'react';
import { object } from '@storybook/addon-knobs';

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

export default { title: 'Claim Response' };

export const ExampleDSTU2 = () => {
  const fhirResource = object('Resource', exampleClaimResponseDSTU2);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={require('../../../assets/containers/ClaimResponse/claim-response.svg')}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', exampleClaimResponseSTU3);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={ClaimResponseIcon}
    />
  );
};
export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', example2ClaimResponseSTU3);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', example1ClaimResponseR4);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={false}
    />
  );
};
export const Example2OfR4 = () => {
  const fhirResource = object('Resource', example2ClaimResponseR4);
  return (
    <ClaimResponse
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={'random text'}
    />
  );
};
export const Example3OfR4 = () => {
  const fhirResource = object('Resource', example3ClaimResponseR4);
  return (
    <ClaimResponse fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />
  );
};
