import React from 'react';
import { render } from '@testing-library/react';

import MedicationOrder from './MedicationOrder';

import example from '../../../fixtures/dstu2/resources/medicationOrder/example.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render MedicationOrder component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: example,
    };

    const { getByAltText } = render(<MedicationOrder {...defaultProps} />);
    const headerIcon = getByAltText('medication order');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: example,
      fhirIcons: false,
    };

    const { getByTestId } = render(<MedicationOrder {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example,
      fhirIcons: (
        <img
          src={require('../assets/containers/MedicationOrder/medication-order.svg')}
          alt="medication order"
        />
      ),
    };

    const { getByAltText } = render(<MedicationOrder {...defaultProps} />);
    const headerIcon = getByAltText('medication order');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<MedicationOrder {...defaultProps} />);
    const headerIcon = getByAltText('medication order');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: example,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<MedicationOrder {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: example,
    };

    const { getByTestId } = render(<MedicationOrder {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'Medication/MedicationExample2',
    );
    expect(getByTestId('reasonCode').textContent).toContain('Otitis Media');
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take 5ml three times daily',
    );
  });
});
