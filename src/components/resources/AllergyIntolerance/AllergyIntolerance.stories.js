import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example2.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example2.json';
import example1AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example2.json';
import example3AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import fhirVersions from '../fhirResourceVersions';
import AllergyIntoleranceIcon from '../../../assets/containers/AllergyIntolerance/allergy-intolerance.svg';

export default {
  title: 'AllergyIntolerance',
  component: AllergyIntolerance,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <AllergyIntolerance {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleAllergyIntoleranceDSTU2,
  fhirIcons: require('../../../assets/containers/AllergyIntolerance/allergy-intolerance.svg'),
};

export const Example2ofDSTU2 = Template.bind({});
Example2ofDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example2AllergyIntoleranceDSTU2,
  fhirIcons: AllergyIntoleranceIcon,
};

export const ExampleDiagnosticReportSTU3 = Template.bind({});
ExampleDiagnosticReportSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleAllergyIntoleranceSTU3,
  fhirIcons: fhirIcons,
};

export const Example2DiagnosticReportSTU3 = Template.bind({});
Example2DiagnosticReportSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2AllergyIntoleranceSTU3,
  fhirIcons: false,
};

export const Example1R4 = Template.bind({});
Example1R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1AllergyIntoleranceR4,
  fhirIcons: 'random text',
};

export const Example2R4 = Template.bind({});
Example2R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2AllergyIntoleranceR4,
};

export const Example3R4 = Template.bind({});
Example3R4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example3AllergyIntoleranceR4,
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: example2AllergyIntoleranceSTU3,
};
