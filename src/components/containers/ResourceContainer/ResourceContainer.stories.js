import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import ResourceContainer from './ResourceContainer';
import Encounter from '../../../components/resources/Encounter';
import Generic from '../../resources/Generic';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import fhirVersions from '../../../components/resources/fhirResourceVersions';

export default {
  title: 'ResourceContainer',
  component: ResourceContainer,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <ResourceContainer {...args} />;

export const DefaultVisualizationWithRawButtonHiddenInsideAccordion = Template.bind(
  {},
);
DefaultVisualizationWithRawButtonHiddenInsideAccordion.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1,
};

const exampleResource = {
  resourceType: 'UnknownResource',
  id: '12345',
  code: {
    text: 'Resource code text',
  },
};

export const DefaultVisualizationWithRawButtonVisibleOutsideAccordion = Template.bind(
  {},
);
DefaultVisualizationWithRawButtonVisibleOutsideAccordion.args = {
  fhirResource: exampleResource,
};

export const VisualizationWithoutFhirVersion = Template.bind({});
VisualizationWithoutFhirVersion.args = {
  fhirResource: example1,
};
