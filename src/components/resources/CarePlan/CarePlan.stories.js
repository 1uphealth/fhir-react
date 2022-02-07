import React from 'react';
import { object } from '@storybook/addon-knobs';

import CarePlan from './CarePlan';

import exampleCarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';
import exampleCarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example1.json';
import example2CarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example2.json';
import weightLossCarePlanR4 from '../../../fixtures/r4/resources/carePlan/weightLossPlan.json';
import pregnancyCarePlanR4 from '../../../fixtures/r4/resources/carePlan/pregnancyPlan.json';
import heartOperationCarePlanR4 from '../../../fixtures/r4/resources/carePlan/heartOperationPlan.json';
import fhirVersions from '../fhirResourceVersions';
import CarePlanIcon from '../../../assets/containers/CarePlan/care-plan.svg';
import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'CarePlan' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCarePlanDSTU2);
  return (
    <CarePlan
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/CarePlan/care-plan.svg')}
    />
  );
};

export const ExampleCarePlanSTU3 = () => {
  const fhirResource = object('Resource', exampleCarePlanSTU3);
  return (
    <CarePlan
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={CarePlanIcon}
    />
  );
};

export const Example2CarePlanSTU3 = () => {
  const fhirResource = object('Resource', example2CarePlanSTU3);
  return (
    <CarePlan
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const WeightLossCarePlanR4 = () => {
  const fhirResource = object('Resource', weightLossCarePlanR4);
  return (
    <CarePlan
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={false}
    />
  );
};

export const PregnancyCarePlanR4 = () => {
  const fhirResource = object('Resource', pregnancyCarePlanR4);
  return (
    <CarePlan
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
    />
  );
};

export const HeartOperatioCarePlanR4 = () => {
  const fhirResource = object('Resource', heartOperationCarePlanR4);
  return <CarePlan fhirVersion={fhirVersions.R4} fhirResource={fhirResource} />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', example2CarePlanSTU3);
  return <CarePlan fhirResource={fhirResource} />;
};
