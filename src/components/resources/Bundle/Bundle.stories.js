import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

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
  component: Bundle,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Bundle {...args} />;

export const Example1OfDSTU2 = Template.bind({});
Example1OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example1,
};

export const Example2OfDSTU2 = Template.bind({});
Example2OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example2,
};

export const Example3OfDSTU2 = Template.bind({});
Example3OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example3,
};

export const Example4OfDSTU2 = Template.bind({});
Example4OfDSTU2.args = {
  fhirVersion: fhirVersions.DSTU2,
  fhirResource: dstu2Example4,
};

export const Example1OfSTU3 = Template.bind({});
Example1OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example1,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example2,
};

export const Example3OfSTU3 = Template.bind({});
Example3OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example3,
};

export const Example4OfSTU3 = Template.bind({});
Example4OfSTU3.args = {
  fhirVersion: fhirVersions.STU3,
  fhirResource: stu3Example4,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example1,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example2,
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example3,
};

export const Example4OfR4 = Template.bind({});
Example4OfR4.args = {
  fhirVersion: fhirVersions.R4,
  fhirResource: r4Example4,
};

export const ExampleWithoutFHIRVersionProperty = Template.bind({});
ExampleWithoutFHIRVersionProperty.args = {
  fhirResource: stu3Example2,
};
