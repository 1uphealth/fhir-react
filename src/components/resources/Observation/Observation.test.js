// import '@testing-library/jest-dom/extend-expect';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render } from '@testing-library/react';
import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';

describe('should render component correctly', () => {
  it('DSTU2 - without issued field', () => {
    const defaultProps = {
      fhirResource: exampleObservation,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('DSTU2 - with issued field', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('DSTU3 - without issued field', () => {
    const defaultProps = {
      fhirResource: exampleObservationSTU3,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('DSTU3 - with issued field', () => {
    const defaultProps = {
      fhirResource: exampleObservationExcessSTU3,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });
});
