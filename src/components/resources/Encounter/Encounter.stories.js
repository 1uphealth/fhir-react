import React from 'react';
import { object } from '@storybook/addon-knobs';

import Encounter from './Encounter';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';
import example1_R4 from '../../../fixtures/r4/resources/encounter/example1.json';
import example2_R4 from '../../../fixtures/r4/resources/encounter/example2.json';
import example3_R4 from '../../../fixtures/r4/resources/encounter/example3.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Encounter',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1);
  return (
    <Encounter
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutParticipantsDSTU2 = () => {
  const fhirResource = object('Resource', example2);
  return (
    <Encounter
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example_STU3);
  return (
    <Encounter
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutParticipantSTU3 = () => {
  const fhirResource = object('Resource', example2_STU3);
  return (
    <Encounter
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutParticipantR4 = () => {
  const fhirResource = object('Resource', example1_R4);
  return (
    <Encounter
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2ofR4 = () => {
  const fhirResource = object('Resource', example2_R4);
  return (
    <Encounter
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example3ofR4 = () => {
  const fhirResource = object('Resource', example3_R4);
  return (
    <Encounter
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example2_STU3);
  return <Encounter fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};
