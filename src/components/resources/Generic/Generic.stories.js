import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Generic from './Generic';
import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'Generic',
  component: Generic,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Generic {...args} />;

const exampleResource = {
  resourceType: 'UnknownResource',
  id: '12345',
  code: {
    text: 'Resource code text',
  },
};
export const DefaultVisualization = Template.bind({});
DefaultVisualization.args = {
  fhirResource: exampleResource,
  fhirIcons: fhirIcons,
};
