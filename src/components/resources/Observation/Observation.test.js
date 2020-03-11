// import '@testing-library/jest-dom/extend-expect';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render } from '@testing-library/react';
import Observation from './Observation';

import exampleObservation from '../../../fixtures/dstu2/resources/observation/example.json';
import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationSTU3 from '../../../fixtures/stu3/resources/observation/example-weight.json';
import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';

import example1ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example2.json';
import example2ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example3.json';

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

  test('R4 - with issued field', () => {
    const defaultProps = {
      fhirResource: example1ObservationExcessR4,
    };
    const { container, getByTestId } = render(
      <Observation {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent.trim()).toContain(
      'Glucose [Moles/volume] in Blood',
    );
    expect(getByTestId('status').textContent).toEqual('final');
    expect(getByTestId('issuedOn').textContent).toEqual('2013-04-03');
    expect(getByTestId('subject').textContent).toContain('P. van de Heuvel');
  });

  test('R4 - with issued field - example 2', () => {
    const defaultProps = {
      fhirResource: example2ObservationExcessR4,
    };
    const { container, getByTestId, queryByTestId, queryByText } = render(
      <Observation {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent.trim()).toEqual(
      'Second hand smoke exposure CPHS',
    );
    expect(getByTestId('status').textContent).toEqual('final');
    expect(getByTestId('secondaryStatus').textContent).toEqual('YES');
    expect(queryByTestId('issuedOn')).toBeNull();
    expect(getByTestId('subject').textContent).toContain('Patient/infant');
    expect(queryByText('373066001')).not.toBeNull();
  });
});
