import React from 'react';
import { object } from '@storybook/addon-knobs';

import QuestionnaireResponse from './QuestionnaireResponse';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaireResponse/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaireResponse/example2.json';
import dstu2Example3 from '../../../fixtures/dstu2/resources/questionnaireResponse/example3.json';

import stu3Example1 from '../../../fixtures/stu3/resources/questionnaireResponse/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/questionnaireResponse/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/questionnaireResponse/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/questionnaireResponse/example2.json';

export default { title: 'QuestionnaireResponse' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const Example3OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example3);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <QuestionnaireResponse
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};
