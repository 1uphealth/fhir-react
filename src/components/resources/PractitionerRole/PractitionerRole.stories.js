import React from 'react';
import { object } from '@storybook/addon-knobs';

import PractitionerRole from './PractitionerRole';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/practitionerRole/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/practitionerRole/example2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/practitionerRole/example3.json';

import r4Example1 from '../../../fixtures/r4/resources/practitionerRole/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitionerRole/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/practitionerRole/example3.json';
import r4Example4 from '../../../fixtures/r4/resources/practitionerRole/example4.json';

export default { title: 'PractitionerRole' };

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example3);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};

export const Example4OfR4 = () => {
  const fhirResource = object('Resource', r4Example4);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
    />
  );
};
