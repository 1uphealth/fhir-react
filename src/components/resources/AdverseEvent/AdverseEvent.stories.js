import React from 'react';
import { object } from '@storybook/addon-knobs';

import AdverseEvent from './AdverseEvent';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';
import stu4Example1 from '../../../fixtures/stu4/resources/adverseEvent/example1.json';

export default {
  title: 'AdverseEvent',
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <AdverseEvent fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const Example1ofSTU4 = () => {
  const fhirResource = object('Resource', stu4Example1);
  return (
    <AdverseEvent fhirResource={fhirResource} fhirVersion={fhirVersions.STU4} />
  );
};
