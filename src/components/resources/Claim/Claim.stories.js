import React from 'react';
import { object } from '@storybook/addon-knobs';

import Claim from './Claim';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/claim/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claim/example-1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/claim/example-2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/claim/example-3.json';

import r4Example1 from '../../../fixtures/r4/resources/claim/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/claim/example2.json';
import ClaimIcon from '../../../assets/containers/Claim/claim.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Claim',
};

export const ExampleOfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Claim
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Claim/claim.svg')}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Claim
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={ClaimIcon}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <Claim
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example3);
  return (
    <Claim
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <Claim
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Claim fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};
