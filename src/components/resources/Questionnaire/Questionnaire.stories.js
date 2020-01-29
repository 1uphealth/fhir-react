import React from 'react';
import { object } from '@storybook/addon-knobs';

import Questionnaire from './Questionnaire';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaire/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaire/example2.json';
import dstu2Example3 from '../../../fixtures/dstu2/resources/questionnaire/example3.json';

import stu3Example1 from '../../../fixtures/stu3/resources/questionnaire/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/questionnaire/example2.json';

export default { title: 'Questionnaire' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Questionnaire
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Questionnaire
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const Example3OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example3);
  return (
    <Questionnaire
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Questionnaire
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <Questionnaire
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
    />
  );
};
