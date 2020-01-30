import React from 'react';
import { object } from '@storybook/addon-knobs';

import Coverage from './Coverage';

import exampleCoverageDstu2 from '../../../fixtures/dstu2/resources/coverage/example1.json';
import exampleCoverageStu3 from '../../../fixtures/stu3/resources/coverage/example1.json';
import example2CoverageStu3 from '../../../fixtures/stu3/resources/coverage/example2.json';
import fhirVersions from '../fhirResourceVersions';

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

export const ExampleWithoutFhirVersionProperty = () => {
  const fhirResource = object('Resource', exampleCoverageStu3);
  return <Coverage fhirResource={fhirResource} />;
};
