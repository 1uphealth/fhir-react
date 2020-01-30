import React from 'react';
import { object } from '@storybook/addon-knobs';

import Encounter from './Encounter';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'Encounter',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return (
    <Encounter fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const ExampleWithoutParticipantsDSTU2 = () => {
  const fhirResource = object('Resource', example2);
  return (
    <Encounter fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example_STU3);
  return (
    <Encounter fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const ExampleWithoutParticipantSTU3 = () => {
  const fhirResource = object('Resource', example2_STU3);
  return (
    <Encounter fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example2_STU3);
  return <Encounter fhirResource={fhirResource} />;
};
