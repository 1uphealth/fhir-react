import React from 'react';
import { object } from '@storybook/addon-knobs';

import Binary from './Binary';

import stu3ExamplePdf from '../../../fixtures/stu3/resources/binary/example-pdf.json';
import stu3ExampleJpeg from '../../../fixtures/stu3/resources/binary/example-jpeg.json';
import stu3ExampleJson from '../../../fixtures/stu3/resources/binary/example-json.json';

export default {
  title: 'Binary',
};

export const PdfSTU3 = () => {
  const fhirResource = object('Resource', stu3ExamplePdf);
  return <Binary fhirResource={fhirResource} />;
};

export const JpegSTU3 = () => {
  const fhirResource = object('Resource', stu3ExampleJpeg);
  return <Binary fhirResource={fhirResource} />;
};

export const JsonSTU3 = () => {
  const fhirResource = object('Resource', stu3ExampleJson);
  return <Binary fhirResource={fhirResource} />;
};
