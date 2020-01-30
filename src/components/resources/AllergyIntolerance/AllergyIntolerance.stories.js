import React from 'react';
import { object } from '@storybook/addon-knobs';

import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example2.json';
import fhirVersions from '../fhirResourceVersions';

export default { title: 'AllergyIntolerance' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleAllergyIntoleranceDSTU2);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleDiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', exampleAllergyIntoleranceSTU3);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example2DiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceSTU3);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceSTU3);
  return <AllergyIntolerance fhirResource={fhirResource} />;
};
