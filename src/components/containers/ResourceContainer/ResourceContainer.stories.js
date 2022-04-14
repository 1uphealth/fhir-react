import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';

import ResourceContainer from './ResourceContainer';
import Encounter from '../../../components/resources/Encounter';
import Generic from '../../resources/Generic';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import fhirVersions from '../../../components/resources/fhirResourceVersions';

export default {
  title: 'ResourceContainer',
  component: ResourceContainer,
  decorators: [withKnobs],
  argTypes: { data: { control: 'object' } },
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

export const DefaultVisualizationWithRawButtonVisibleOutsideAccordion = ({
  data,
}) => {
  const exampleResource = {
    resourceType: 'UnknownResource',
    id: '12345',
    code: {
      text: 'Resource code text',
    },
  };

  data = exampleResource;
  const props = {
    fhirResource: { data },
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
