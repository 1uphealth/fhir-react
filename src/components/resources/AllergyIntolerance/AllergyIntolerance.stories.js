import React from 'react';
import { object } from '@storybook/addon-knobs';

import AllergyIntolerance from './AllergyIntolerance';

import exampleAllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceDSTU2 from '../../../fixtures/dstu2/resources/allergyIntolerance/example2.json';
import exampleAllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceSTU3 from '../../../fixtures/stu3/resources/allergyIntolerance/example2.json';
import example1AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example1.json';
import example2AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example2.json';
import example3AllergyIntoleranceR4 from '../../../fixtures/r4/resources/allergyIntolerance/example3.json';
import fhirIcons from '../../../fixtures/example-icons';
import fhirVersions from '../fhirResourceVersions';

export default { title: 'AllergyIntolerance' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleAllergyIntoleranceDSTU2);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2ofDSTU2 = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceDSTU2);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.DSTU2}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleDiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', exampleAllergyIntoleranceSTU3);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2DiagnosticReportSTU3 = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceSTU3);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1R4 = () => {
  const fhirResource = object('Resource', example1AllergyIntoleranceR4);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2R4 = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceR4);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example3R4 = () => {
  const fhirResource = object('Resource', example3AllergyIntoleranceR4);
  return (
    <AllergyIntolerance
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', example2AllergyIntoleranceSTU3);
  return (
    <AllergyIntolerance fhirResource={fhirResource} fhirIcons={fhirIcons} />
  );
};
