import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

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
  component: MedicationKnowledge,
  argTypes: {
    ...defaultArgTypes,
    withDaVinciPDex: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <MedicationKnowledge {...args} />;

export const DefaultVisualizationR4 = Template.bind({});
DefaultVisualizationR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1R4,
  fhirIcons: require('../../../assets/containers/MedicationKnowledge/medication-knowledge.svg'),
};

export const ExampleR4WithoutDaVinciPDex = Template.bind({});
ExampleR4WithoutDaVinciPDex.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2R4,
  fhirIcons: MedicationKnowledgeIcon,
};

export const ExampleR4WithDaVinciPDex = Template.bind({});
ExampleR4WithDaVinciPDex.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2R4,
  fhirIcons: fhirIcons,
  withDaVinciPDex: true,
};

export const Example2R4 = Template.bind({});
Example2R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3R4,
  fhirIcons: false,
};

export const Example3R4WithDaVinciPDex = Template.bind({});
Example3R4WithDaVinciPDex.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example4R4,
  fhirIcons: 'random text',
  withDaVinciPDex: true,
};

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: example3R4,
};

export const ExampleWithUnsupportedFHIRVersionProperty = Template.bind({});
ExampleWithUnsupportedFHIRVersionProperty.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example4R4,
};
