import React from 'react';
import { object } from '@storybook/addon-knobs';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import fhirVersions from '../fhirResourceVersions';

import example1Dstu2 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';
import example2R4 from '../../../fixtures/r4/resources/explanationOfBenefit/eobForClaimWithErrors.json';
import exampleC4BB from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExample.json';

export default {
  title: 'ExplanationOfBenefit',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', example1Dstu2);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', example1Stu3);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};
export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', example2Stu3);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};
export const PersonPrimaryCoverageR4 = () => {
  const fhirResource = object('Resource', example1R4);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};
export const EOBForClaimWithErrorsR4 = () => {
  const fhirResource = object('Resource', example2R4);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleWithoutFHIRVersionProperty = () => {
  const fhirResource = object('Resource', example1Stu3);
  return <ExplanationOfBenefit fhirResource={fhirResource} />;
};

export const EOBCarinBlueButtonExample = () => {
  const fhirResource = object('Resource', exampleC4BB);
  return (
    <ExplanationOfBenefit
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};
