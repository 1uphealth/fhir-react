import React from 'react';
import { object } from '@storybook/addon-knobs';

import MedicationKnowledge from './MedicationKnowledge';
import fhirVersions from '../fhirResourceVersions';

import example1R4 from '../../../fixtures/r4/resources/medicationKnowledge/example1.json';
import example2R4 from '../../../fixtures/r4/resources/medicationKnowledge/example2.json';
import example3R4 from '../../../fixtures/r4/resources/medicationKnowledge/example3.json';
import example4R4 from '../../../fixtures/r4/resources/medicationKnowledge/example4.json';
import fhirIcons from '../../../fixtures/example-icons';
import MedicationKnowledgeIcon from '../../../assets/containers/MedicationKnowledge/medication-knowledge.svg';

export default {
  title: 'MedicationKnowledge',
};

export const DefaultVisualizationR4 = () => {
  const fhirResource = object('Resource', example1R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/MedicationKnowledge/medication-knowledge.svg')}
    />
  );
};
export const ExampleR4WithoutDaVinciPDex = () => {
  const fhirResource = object('Resource', example2R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={MedicationKnowledgeIcon}
    />
  );
};
export const ExampleR4WithDaVinciPDex = () => {
  const fhirResource = object('Resource', example2R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      withDaVinciPDex
      fhirIcons={fhirIcons}
    />
  );
};
export const Example2R4 = () => {
  const fhirResource = object('Resource', example3R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example3R4WithDaVinciPDex = () => {
  const fhirResource = object('Resource', example4R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      withDaVinciPDex
      fhirIcons={false}
    />
  );
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example3R4);
  return <MedicationKnowledge fhirResource={fhirResource} />;
};

export const ExampleWithUnsupportedFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example4R4);
  return (
    <MedicationKnowledge
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};
