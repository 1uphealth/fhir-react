import React from 'react';
import { object } from '@storybook/addon-knobs';

import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import example1RelatedPerson from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import example2RelatedPersonDSTU2 from '../../../fixtures/dstu2/resources/relatedPerson/example2.json';

import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'RelatedPerson' };

export const Example1 = () => {
  const fhirResource = object('Resource', example1RelatedPerson);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={fhirIcons}
    />
  );
};

export const Example2 = () => {
  const fhirResource = object('Resource', example2RelatedPersonDSTU2);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};
