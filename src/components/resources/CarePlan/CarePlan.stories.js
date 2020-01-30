import React from 'react';
import { object } from '@storybook/addon-knobs';

import CarePlan from './CarePlan';

import exampleCarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';
import exampleCarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example1.json';
import example2CarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example2.json';
import fhirVersions from '../fhirResourceVersions';

export default { title: 'CarePlan' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCarePlanDSTU2);
  return (
    <CarePlan fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const ExampleCarePlanSTU3 = () => {
  const fhirResource = object('Resource', exampleCarePlanSTU3);
  return (
    <CarePlan fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const Example2CarePlanSTU3 = () => {
  const fhirResource = object('Resource', example2CarePlanSTU3);
  return (
    <CarePlan fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', example2CarePlanSTU3);
  return <CarePlan fhirResource={fhirResource} />;
};
