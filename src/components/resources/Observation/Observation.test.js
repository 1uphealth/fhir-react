// import '@testing-library/jest-dom/extend-expect';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { render } from '@testing-library/react';
import Observation from './Observation';

import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';

import example1ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example2.json';
import example2ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example3.json';

describe('should render component correctly', () => {
  test('DSTU2 renders properly', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('DSTU3 renders properly', () => {
    const defaultProps = {
      fhirResource: exampleObservationExcessSTU3,
    };
    const { container } = render(<Observation {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('R4 renders properly, example 1', () => {
    const defaultProps = {
      fhirResource: example1ObservationExcessR4,
    };
    const { container, getByTestId, queryByTestId } = render(
      <Observation {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent.trim()).toContain(
      'Glucose [Moles/volume] in Blood',
    );
    expect(getByTestId('status').textContent).toEqual('final');
    expect(queryByTestId('issuedOn')).toBeNull();
    expect(getByTestId('subject').textContent).toContain('P. van de Heuvel');
  });

  test('R4 renders properly, example 2', () => {
    const defaultProps = {
      fhirResource: example2ObservationExcessR4,
    };
    const { container, getByTestId, queryByText } = render(
      <Observation {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent.trim()).toEqual(
      'Second hand smoke exposure CPHS',
    );
    expect(getByTestId('status').textContent).toEqual('final');
    expect(getByTestId('secondaryStatus').textContent).toEqual('YES');
    expect(getByTestId('issuedOn').textContent).toEqual('2016-05-18');
    expect(getByTestId('subject').textContent).toContain('Patient/infant');
    expect(queryByText('373066001')).not.toBeNull();
  });

  test('should round the quantity to default value of digitsToRoundForQuantity props ', () => {
    const resource = example1ObservationExcessR4;
    resource.valueQuantity.value = 6.43534535434;

    const defaultProps = {
      fhirResource: example1ObservationExcessR4,
    };
    const { getByTestId } = render(<Observation {...defaultProps} />);

    expect(getByTestId('valueQuantity')).not.toBeNull();
    expect(getByTestId('valueQuantity').textContent).toEqual('6.44mmol/l');
  });

  test('should round the quantity to specific value of digitsToRoundForQuantity props ', () => {
    const resource = example1ObservationExcessR4;
    resource.valueQuantity.value = 6.43534535434;

    const defaultProps = {
      fhirResource: example1ObservationExcessR4,
      digitsToRoundForQuantity: 3,
    };
    const { getByTestId } = render(<Observation {...defaultProps} />);

    expect(getByTestId('valueQuantity')).not.toBeNull();
    expect(getByTestId('valueQuantity').textContent).toEqual('6.435mmol/l');
  });
});
