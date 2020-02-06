import React from 'react';
import { object } from '@storybook/addon-knobs';
import fhirVersions from '../fhirResourceVersions';

import Condition from './Condition';

import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import example3Condition from '../../../fixtures/dstu2/resources/condition/example3.json';

import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';

import example1ConditionSTU4 from '../../../fixtures/stu4/resources/condition/example1.json';
import example2ConditionSTU4 from '../../../fixtures/stu4/resources/condition/example2.json';
import example3ConditionSTU4 from '../../../fixtures/stu4/resources/condition/example3.json';

export default { title: 'Condition' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleConditionSeverity);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const ExampleWithoutSeverityDSTU2 = () => {
  const fhirResource = object('Resource', exampleCondition);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example3OfDSTU2 = () => {
  const fhirResource = object('Resource', example3Condition);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const ExampleWithoutSeveritySTU3 = () => {
  const fhirResource = object('Resource', exampleConditionSTU3);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const ExampleWithSeveritySTU3 = () => {
  const fhirResource = object('Resource', exampleConditionSeveritySTU3);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};

export const Example1ofSTU4 = () => {
  const fhirResource = object('Resource', example1ConditionSTU4);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.STU4} />
  );
};

export const Example2ofSTU4 = () => {
  const fhirResource = object('Resource', example2ConditionSTU4);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.STU4} />
  );
};

export const Example3ofSTU4 = () => {
  const fhirResource = object('Resource', example3ConditionSTU4);
  return (
    <Condition fhirResource={fhirResource} fhirVersion={fhirVersions.STU4} />
  );
};
