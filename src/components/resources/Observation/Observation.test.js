// import '@testing-library/jest-dom/extend-expect';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Observation from './Observation';

import exampleObservationIssued from '../../../fixtures/dstu2/resources/observation/example-issued.json';

import exampleObservationExcessSTU3 from '../../../fixtures/stu3/resources/observation/example-f002-excess.json';

import example1ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example2.json';
import example2ObservationExcessR4 from '../../../fixtures/r4/resources/observation/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
    };

    const { getByAltText } = render(<Observation {...defaultProps} />);
    const headerIcon = getByAltText('observation');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Observation {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
      fhirIcons: (
        <img
          src={require('../assets/containers/ExplanationOfBenefit/explanation-of-benefit.svg')}
          alt="observation"
        />
      ),
    };

    const { getByAltText } = render(<Observation {...defaultProps} />);
    const headerIcon = getByAltText('observation');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleObservationIssued,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Observation {...defaultProps} />);
    const headerIcon = getByAltText('observation');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: exampleObservationIssued,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Observation {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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
    expect(getByTestId('issuedOn').textContent).toEqual('05/18/2016');
    expect(getByTestId('subject').textContent).toContain('Patient/infant');
    expect(queryByText(/373066001/g)).not.toBeNull();
  });

  test('should display not rounded value', () => {
    const resource = example1ObservationExcessR4;
    resource.valueQuantity.value = 6.443;

    const defaultProps = {
      fhirResource: example1ObservationExcessR4,
    };
    const { getByTestId } = render(<Observation {...defaultProps} />);

    expect(getByTestId('valueQuantity')).not.toBeNull();
    expect(getByTestId('valueQuantity').textContent).toEqual('6.443');
    expect(getByTestId('valueQuantityUnit')).not.toBeNull();
    expect(getByTestId('valueQuantityUnit').textContent).toEqual('mmol/l');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = { fhirResource: example1ObservationExcessR4 };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Observation {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = { fhirResource: example1ObservationExcessR4 };

    const onClick = 'test';
    const { getByRole } = render(
      <Observation {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
