import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Organization from './Organization';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/organization/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/organization/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/organization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/organization/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/organization/example3.json';

import fhirIcons from '../../../fixtures/example-icons';
import OrganizationIcon from '../../../assets/containers/Organization/organization.svg';

export default {
  title: 'Organization',
};

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example1);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={OrganizationIcon}
    />
  );
};

export const Example2OfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2Example2);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example1OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example1);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={false}
    />
  );
};

export const Example2OfSTU3 = () => {
  const fhirResource = object('Resource', stu3Example2);
  return (
    <Organization
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={'random text'}
    />
  );
};

export const Example1OfR4 = () => {
  const fhirResource = object('Resource', r4Example1);
  return (
    <Organization fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />
  );
};

export const Example2OfR4 = () => {
  const fhirResource = object('Resource', r4Example2);
  return (
    <Organization fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />
  );
};

export const Example3OfR4 = () => {
  const fhirResource = object('Resource', r4Example3);
  return (
    <Organization fhirResource={fhirResource} fhirVersion={fhirVersions.R4} />
  );
};
