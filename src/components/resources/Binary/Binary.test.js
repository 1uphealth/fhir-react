import React from 'react';
import { render } from '@testing-library/react';
import Binary from './Binary';

import stu3ExamplePdf from '../../../fixtures/stu3/resources/binary/example-pdf.json';
import stu3ExampleJpeg from '../../../fixtures/stu3/resources/binary/example-jpeg.json';
import stu3ExampleJson from '../../../fixtures/stu3/resources/binary/example-json.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: stu3ExamplePdf,
    };

    const { getByAltText } = render(<Binary {...defaultProps} />);
    const headerIcon = getByAltText('binary');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: stu3ExamplePdf,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Binary {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: stu3ExamplePdf,
      fhirIcons: (
        <img
          src={require('../assets/containers/Binary/binary.svg')}
          alt="binary"
        />
      ),
    };

    const { getByAltText } = render(<Binary {...defaultProps} />);
    const headerIcon = getByAltText('binary');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: stu3ExamplePdf,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Binary {...defaultProps} />);
    const headerIcon = getByAltText('binary');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: stu3ExamplePdf,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Binary {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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
