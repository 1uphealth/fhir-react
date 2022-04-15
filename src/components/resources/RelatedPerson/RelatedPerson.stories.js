import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import RelatedPerson from './RelatedPerson';
import fhirVersions from '../fhirResourceVersions';

import exampleDSTU2 from '../../../fixtures/dstu2/resources/relatedPerson/example1.json';
import exampleSTU3 from '../../../fixtures/stu3/resources/relatedPerson/example1.json';
import exampleR4 from '../../../fixtures/r4/resources/relatedPerson/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

export default {
  title: 'RelatedPerson',
  component: RelatedPerson,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <RelatedPerson {...args} />;

export const ExampleDSTU2 = Template.bind({});
ExampleDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: exampleDSTU2,
  fhirIcons: fhirIcons,
};

export const ExampleSTU3 = Template.bind({});
ExampleSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: exampleSTU3,
  fhirIcons: false,
};

export const ExampleR4 = Template.bind({});
ExampleR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: exampleR4,
  fhirIcons: 'random text',
};
