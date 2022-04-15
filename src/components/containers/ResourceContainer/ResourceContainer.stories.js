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
    children: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <ResourceContainer {...args} />;

const propsRawInsideAccordion = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: example1,
};
export const DefaultVisualizationWithRawButtonHiddenInsideAccordion = Template.bind(
  {},
);
DefaultVisualizationWithRawButtonHiddenInsideAccordion.args = {
  ...propsRawInsideAccordion,
  children: <Encounter {...propsRawInsideAccordion} />,
};

const exampleResource = {
  resourceType: 'UnknownResource',
  id: '12345',
  code: {
    text: 'Resource code text',
  },
};
const propsRawOutsideAccordion = { fhirResource: exampleResource };
export const DefaultVisualizationWithRawButtonVisibleOutsideAccordion = Template.bind(
  {},
);
DefaultVisualizationWithRawButtonVisibleOutsideAccordion.args = {
  ...propsRawOutsideAccordion,
  children: <Generic {...propsRawOutsideAccordion} />,
};

const propsWithoutVersion = {
  fhirResource: example1,
};
export const VisualizationWithoutFhirVersion = Template.bind({});
VisualizationWithoutFhirVersion.args = {
  ...propsWithoutVersion,
  children: <Encounter {...propsWithoutVersion} />,
};
