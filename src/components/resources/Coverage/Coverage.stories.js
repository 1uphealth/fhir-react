import React from 'react';
import { object } from '@storybook/addon-knobs';

import Coverage from './Coverage';
import fhirVersions from '../fhirResourceVersions';

import exampleCoverageDstu2 from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';
import example2CoverageStu3 from '../../../fixtures/stu3/resources/coverage/example2.json';
import exampleCoverageR4 from '../../../fixtures/r4/resources/coverage/example1.json';
import example2CoverageR4 from '../../../fixtures/r4/resources/coverage/example2.json';

export default { title: 'Coverage' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleCoverageDstu2);
  return (
    <Coverage fhirVersion={fhirVersions.DSTU2} fhirResource={fhirResource} />
  );
};

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', exampleCoverageStu3);
  return (
    <Coverage fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', example2CoverageStu3);
  return (
    <Coverage fhirVersion={fhirVersions.STU3} fhirResource={fhirResource} />
  );
};

export const ExampleOfR4 = () => {
  const fhirResource = object('Resource', exampleCoverageR4);
  return <Coverage fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', example2CoverageR4);
  return <Coverage fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', exampleCoverageStu3);
  return <Coverage fhirResource={fhirResource} />;
};
