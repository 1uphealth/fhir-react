import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';
import example3ObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example3.json';
import example1ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example1.json';
import example2ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example2.json';
import example3ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example3.json';
import ObservationIcon from '../../../assets/containers/Observation/observation.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Observation',
  component: Observation,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Observation {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: exampleObservationIssued,
  fhirIcons: require('../../../assets/containers/Observation/observation.svg'),
};

export const ExampleWithoutIssuedDSTU2 = Template.bind({});
ExampleWithoutIssuedDSTU2.args = {
  fhirResource: exampleObservation,
  fhirIcons: ObservationIcon,
};

export const ExampleWithIssuedSTU3 = Template.bind({});
ExampleWithIssuedSTU3.args = {
  fhirResource: exampleObservationExcessSTU3,
  fhirIcons: fhirIcons,
};

export const ExampleWithoutIssuedSTU3 = Template.bind({});
ExampleWithoutIssuedSTU3.args = {
  fhirResource: exampleObservationSTU3,
  fhirIcons: false,
};

export const Example3OfSTU3 = Template.bind({});
Example3OfSTU3.args = {
  fhirResource: example3ObservationExcessSTU3,
  fhirIcons: 'random text',
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirResource: example1ObservationExcessR4,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirResource: example2ObservationExcessR4,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirResource: example3ObservationExcessR4,
};
