import React from 'react';
import { object } from '@storybook/addon-knobs';

import Generic from './Generic';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'Generic' };

export const DefaultVisualization = () => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };
  const fhirResource = object('Resource', exampleResource);
  return <Generic fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};
