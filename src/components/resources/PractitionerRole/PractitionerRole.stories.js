import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import PractitionerRole from './PractitionerRole';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/practitionerRole/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/practitionerRole/example2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/practitionerRole/example3.json';

import r4Example1 from '../../../fixtures/r4/resources/practitionerRole/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitionerRole/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/practitionerRole/example3.json';
import r4Example4 from '../../../fixtures/r4/resources/practitionerRole/example4.json';
import fhirIcons from '../../../fixtures/example-icons';
import PractitionerRoleIcon from '../../../assets/containers/PractitionerRole/practitioner-role.svg';

export default { title: 'PractitionerRole' };

export const ExampleOfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/PractitionerRole/practitioner-role.svg')}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={PractitionerRoleIcon}
    />
  );
};

export const Example3OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example3);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.STU3}
      fhirResource={fhirResource}
      fhirIcons={fhirIcons}
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
      fhirIcons={false}
    />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <PractitionerRole
      fhirVersion={fhirVersions.R4}
      fhirResource={fhirResource}
      fhirIcons={'random text'}
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
