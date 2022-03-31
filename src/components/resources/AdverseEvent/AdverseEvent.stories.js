import React from 'react';
import { object } from '@storybook/addon-knobs';

import AdverseEvent from './AdverseEvent';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/adverseEvent/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'AdverseEvent',
};

export const DefaultVisualizationSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <AdverseEvent
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1ofR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <AdverseEvent
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={false}
    />
  );
};
