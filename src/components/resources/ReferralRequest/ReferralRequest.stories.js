import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ReferralRequest from './ReferralRequest';

import dstu2Example1 from '../../../fixtures/dstu2/resources/referralRequest/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/referralRequest/example1.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'ReferralRequest',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <ReferralRequest
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <ReferralRequest
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <ReferralRequest fhirResource={fhirResource} />;
};
