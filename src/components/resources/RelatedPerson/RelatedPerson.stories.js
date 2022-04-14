import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import exampleDSTU2 from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import exampleSTU3 from '../../../fixtures/stu3/resources/relatedPerson/example1.json';
import exampleR4 from '../../../fixtures/r4/resources/relatedPerson/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

export default { title: 'RelatedPerson' };

export const ExampleDSTU2 = () => {
  const fhirResource = object('Resource', exampleDSTU2);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
      fhirIcons={fhirIcons}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', exampleSTU3);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
      fhirIcons={false}
    />
  );
};

export const ExampleR4 = () => {
  const fhirResource = object('Resource', exampleR4);
  return (
    <RelatedPerson
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={'random text'}
    />
  );
};
