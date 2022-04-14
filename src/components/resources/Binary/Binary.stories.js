import React from 'react';
import { defaultArgTypes } from '../../defaultArgTypes';

import Binary from './Binary';

import dstu2ExamplePdf from '../../../fixtures/dstu2/resources/binary/example-pdf.json';
import dstu2ExampleJpeg from '../../../fixtures/dstu2/resources/binary/example-jpeg.json';
import stu3ExamplePdf from '../../../fixtures/stu3/resources/binary/example-pdf.json';
import stu3ExampleJpeg from '../../../fixtures/stu3/resources/binary/example-jpeg.json';
import stu3ExampleJson from '../../../fixtures/stu3/resources/binary/example-json.json';
import fhirIcons from '../../../fixtures/example-icons';
import BinaryIcon from '../../../assets/containers/Binary/binary.svg';

export default {
  title: 'Binary',
  component: Binary,
  argTypes: {
    ...defaultArgTypes,
  },
};

const Template = args => <Binary {...args} />;

export const PdfDSTU2 = Template.bind({});
PdfDSTU2.args = {
  fhirResource: dstu2ExamplePdf,
  fhirIcons: require('../../../assets/containers/Binary/binary.svg'),
};

export const JpegDSTU2 = Template.bind({});
JpegDSTU2.args = {
  fhirResource: dstu2ExampleJpeg,
  fhirIcons: BinaryIcon,
};

export const PdfSTU3 = Template.bind({});
PdfSTU3.args = {
  fhirResource: stu3ExamplePdf,
  fhirIcons: false,
};

export const JpegSTU3 = Template.bind({});
JpegSTU3.args = {
  fhirResource: stu3ExampleJpeg,
  fhirIcons: 'random text',
};

export const JsonSTU3 = Template.bind({});
JsonSTU3.args = {
  fhirResource: stu3ExampleJson,
  fhirIcons: fhirIcons,
};
