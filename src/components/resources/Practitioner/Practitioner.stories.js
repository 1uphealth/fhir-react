import React from 'react';
import { object } from '@storybook/addon-knobs';

import Practitioner from './Practitioner';
import fhirResourceTypes from '../fhirResourceTypes';
import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/practitioner/example-2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';

export default { title: 'Practitioner' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Practitioner
      fhirVersion={fhirResourceTypes.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Practitioner
      fhirVersion={fhirResourceTypes.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Practitioner
      fhirVersion={fhirResourceTypes.STU3}
      fhirResource={fhirResource}
    />
  );
};
