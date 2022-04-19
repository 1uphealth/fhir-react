import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Procedure from './Procedure';

import example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/procedure/example-medicare.json';

import r4Example1 from '../../../fixtures/r4/resources/procedure/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/procedure/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/procedure/example3.json';

import fhirIcons from '../../../fixtures/example-icons';
import ProcedureIcon from '../../../assets/containers/Procedure/procedure.svg';

export default {
  title: 'Procedure',
  component: Procedure,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Procedure {...args} />;

export const DefaultVisualizationDSTU2 = Template.bind({});
DefaultVisualizationDSTU2.args = {
  fhirResource: example1,
  fhirIcons: require('../../../assets/containers/Procedure/procedure.svg'),
};

export const ExampleOfSTU3 = Template.bind({});
ExampleOfSTU3.args = {
  fhirResource: stu3Example1,
  fhirIcons: ProcedureIcon,
};

export const Example2OfSTU3 = Template.bind({});
Example2OfSTU3.args = {
  fhirResource: stu3Example2,
  fhirIcons: fhirIcons,
};

export const Example1OfR4 = Template.bind({});
Example1OfR4.args = {
  fhirResource: r4Example1,
  fhirIcons: false,
};

export const Example2OfR4 = Template.bind({});
Example2OfR4.args = {
  fhirResource: r4Example2,
  fhirIcons: 'random text',
};

export const Example3OfR4 = Template.bind({});
Example3OfR4.args = {
  fhirResource: r4Example3,
};
