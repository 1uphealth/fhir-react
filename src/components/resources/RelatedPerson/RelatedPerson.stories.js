import React from 'react';
import { object } from '@storybook/addon-knobs';

import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import example1RelatedPersonDSTU2 from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import example1RelatedPersonSTU3 from '../../../fixtures/stu3/resources/relatedPerson/example1.json';
import example1RelatedPersonR4 from '../../../fixtures/r4/resources/relatedPerson/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'RelatedPerson' };

export const Example1 = () => {
  const fhirResource = object('Resource', example1RelatedPersonDSTU2);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2 = () => {
  const fhirResource = object('Resource', example1RelatedPersonSTU3);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={false}
    />
  );
};

export const Example3 = () => {
  const fhirResource = object('Resource', example1RelatedPersonR4);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={'random text'}
    />
  );
};
