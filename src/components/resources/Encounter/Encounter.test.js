import React from 'react';
import { render } from '@testing-library/react';
import Encounter from './Encounter';

import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';

describe('should render component correctly', () => {
  it('DSTU2 - with PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: 'dstu2',
      fhirResource: example1,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
  });

  it('DSTU2 - without PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: 'dstu2',
      fhirResource: example2,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/Baseline West Medical/i)).toBeTruthy();
  });
  it('STU3 - with PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: 'stu3',
      fhirResource: example_STU3,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
  });

  it('STU3 - without PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: 'stu3',
      fhirResource: example2_STU3,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/inpatient encounter/i)).toBeTruthy();
  });

  it('component without fhirVersion props', () => {
    const defaultProps = {
      fhirResource: example2_STU3,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
  });
});
