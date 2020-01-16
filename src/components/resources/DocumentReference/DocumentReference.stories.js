import React from 'react';
import { object } from '@storybook/addon-knobs';

import fhirVersions from '../fhirResourceVersions';
import DocumentReference from './DocumentReference';

import exampleDocumentReference from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import exampleDocumentReferenceSTU3 from '../../../fixtures/stu3/resources/documentReference/example1.json';

export default { title: 'Document Reference' };

export const DefaultVisualizationDSTU2 = () => {
  const fhirResource = object('Resource', exampleDocumentReference);
  return (
    <DocumentReference
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.DSTU2}
    />
  );
};

export const ExampleSTU3 = () => {
  const fhirResource = object('Resource', exampleDocumentReferenceSTU3);
  return (
    <DocumentReference
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.STU3}
    />
  );
};
