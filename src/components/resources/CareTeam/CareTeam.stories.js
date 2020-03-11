import React from 'react';
import { object } from '@storybook/addon-knobs';

import CareTeam from './CareTeam';
import fhirVersions from '../fhirResourceVersions';
import example_STU3 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/careTeam/example2.json';
import example_R4 from '../../../fixtures/r4/resources/careTeam/example1.json';

export default {
  title: 'CareTeam',
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example_STU3);
  return (
    <CareTeam fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', example2_STU3);
  return (
    <CareTeam fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const ExampleR4 = () => {
  const fhirResource = object('Resource', example_R4);
  return <CareTeam fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};
