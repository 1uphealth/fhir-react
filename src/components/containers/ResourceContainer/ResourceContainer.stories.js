import React from 'react';
import { object } from '@storybook/addon-knobs';

import ResourceContainer from './ResourceContainer';
import Encounter from '../../../components/resources/Encounter';
import Generic from '../../resources/Generic';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import fhirVersions from '../../../components/resources/fhirResourceVersions';

export default {
  title: 'ResourceContainer',
};

export const DefaultVisualizationWithRawButtonHiddenInsideAccordion = () => {
  const fhirResource = object('Resource', example1);
  const props = {
    fhirVersion: fhirVersions.DSTU2,
    fhirResource: fhirResource,
  };

  return (
    <ResourceContainer {...props}>
      <Encounter {...props} />
    </ResourceContainer>
  );
};

export const DefaultVisualizationWithRawButtonVisibleOutsideAccordion = () => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };

  const fhirResource = object('Resource', exampleResource);
  const props = {
    fhirResource: fhirResource,
  };

  return (
    <ResourceContainer {...props}>
      <Generic {...props} />
    </ResourceContainer>
  );
};

export const VisualizationWithoutFhirVersion = () => {
  const fhirResource = object('Resource', example1);
  const props = {
    fhirResource: fhirResource,
  };
  return (
    <ResourceContainer {...props}>
      <Encounter {...props} />
    </ResourceContainer>
  );
};
