import React from 'react';
import { object } from '@storybook/addon-knobs';

import Organization from './Organization';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/organization/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/organization/example2.json';

export default {
  title: 'Organization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Organization fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <Organization fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};
