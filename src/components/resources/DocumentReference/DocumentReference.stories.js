import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import fhirVersions from '../fhirResourceVersions';
import DocumentReference from './DocumentReference';

import exampleDocumentReference from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import exampleDocumentReferenceSTU3 from '../../../fixtures/stu3/resources/documentReference/example1.json';
import example1DocumentReferenceR4 from '../../../fixtures/r4/resources/documentReference/example1.json';
import fhirIcons from '../../../fixtures/example-icons';
import DocumentReferenceIcon from '../../../assets/containers/DocumentReference/document-reference.svg';

export default {
  title: 'DocumentReference',
  component: DocumentReference,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <DocumentReference {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleDocumentReference,
  fhirIcons: require('../../../assets/containers/DocumentReference/document-reference.svg'),
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleDocumentReferenceSTU3,
  fhirIcons: DocumentReferenceIcon,
};

export const ExampleR4 = Template.bind({});
ExampleR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: example1DocumentReferenceR4,
  fhirIcons: fhirIcons,
};
