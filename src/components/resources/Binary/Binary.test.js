import React from 'react';
import { render } from '@testing-library/react';
import Binary from './Binary';

import stu3ExamplePdf from '../../../fixtures/stu3/resources/binary/example-pdf.json';
import stu3ExampleJpeg from '../../../fixtures/stu3/resources/binary/example-jpeg.json';
import stu3ExampleJson from '../../../fixtures/stu3/resources/binary/example-json.json';

describe('should render component correctly', () => {
  it('PDF binary file', () => {
    const { container } = render(<Binary fhirResource={stu3ExamplePdf} />);
    expect(container).not.toBe(null);
  });

  test('JPEG binary file', () => {
    const { container } = render(<Binary fhirResource={stu3ExampleJpeg} />);
    expect(container).not.toBe(null);
  });

  test('JSON file', () => {
    const { container } = render(<Binary fhirResource={stu3ExampleJson} />);
    expect(container.textContent.replace(/\s+/g, '')).toContain(
      '{"birthDate":"2014-06-01"',
    );
  });
});
