import React from 'react';
import { object } from '@storybook/addon-knobs';

import Bundle from './Bundle';

import dstu2Example1 from '../../../fixtures/dstu2/resources/bundle/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/bundle/example2.json';
import dstu2Example3 from '../../../fixtures/dstu2/resources/bundle/example3.json';
import dstu2Example4 from '../../../fixtures/dstu2/resources/bundle/example4.json';
import stu3Example1 from '../../../fixtures/stu3/resources/bundle/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/bundle/example2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/bundle/example3.json';
import stu3Example4 from '../../../fixtures/stu3/resources/bundle/example4.json';
import r4Example1 from '../../../fixtures/r4/resources/bundle/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/bundle/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/bundle/example3.json';
import r4Example4 from '../../../fixtures/r4/resources/bundle/example4.json';
import fhirVersions from '../fhirResourceVersions';

export default {
  title: 'Bundle',
};

export const Example1OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example3OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example3);
  return (
    <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example4OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example4);
  return (
    <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.DSTU2} />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example3);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};

export const Example4OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example4);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />;
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

export const Example4OfR4 = () => {
  const fhirResource = object('Resource', r4Example4);
  return <Bundle fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />;
};

// export const ExampleWithoutFHIRVersionProperty = () => {
//   const fhirResource = object('Resource', stu3Example2);
//   return <Bundle fhirResource={fhirResource} />;
// };
