import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Coverage from './Coverage';
import fhirVersions from '../fhirResourceVersions';

import exampleCoverageDstu2 from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';
import example2CoverageStu3 from '../../../fixtures/stu3/resources/coverage/example2.json';
import exampleCoverageR4 from '../../../fixtures/r4/resources/coverage/example1.json';
import example2CoverageR4 from '../../../fixtures/r4/resources/coverage/example2.json';
import fhirIcons from '../../../fixtures/example-icons';
import CoverageIcon from '../../../assets/containers/Coverage/coverage.svg';

export default {
  title: 'Coverage',
  component: Coverage,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Coverage {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleCoverageDstu2,
  fhirIcons: require('../../../assets/containers/Coverage/coverage.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleCoverageStu3,
  fhirIcons: CoverageIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: example2CoverageStu3,
  fhirIcons: fhirIcons,
};

export const ExampleOfR4 = Template.bind({});
ExampleOfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: exampleCoverageR4,
  fhirIcons: false,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example2CoverageR4,
  fhirIcons: 'random text',
};

export const ExampleWithoutFhirVersionProperty = Template.bind({});
ExampleWithoutFhirVersionProperty.args = {
  fhirResource: exampleCoverageStu3,
};
