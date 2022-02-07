import React from 'react';
import { object } from '@storybook/addon-knobs';

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
};

export const PdfDSTU2 = () => {
  const fhirResource = object('Resource', dstu2ExamplePdf);
  return (
    <Binary
      fhirResource={fhirResource}
      fhirIcons={require('../../../assets/containers/Binary/binary.svg')}
    />
  );
};

export const JpegDSTU2 = () => {
  const fhirResource = object('Resource', dstu2ExampleJpeg);
  return <Binary fhirResource={fhirResource} fhirIcons={BinaryIcon} />;
};

export const PdfSTU3 = () => {
  const fhirResource = object('Resource', stu3ExamplePdf);
  return <Binary fhirResource={fhirResource} fhirIcons={false} />;
};

export const JpegSTU3 = () => {
  const fhirResource = object('Resource', stu3ExampleJpeg);
  return <Binary fhirResource={fhirResource} fhirIcons={'random text'} />;
};

export const JsonSTU3 = () => {
  const fhirResource = object('Resource', stu3ExampleJson);
  return <Binary fhirResource={fhirResource} fhirIcons={fhirIcons} />;
};
