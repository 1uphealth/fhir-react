import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { fhirVersions } from '../../../index';

import MedicationKnowledge from './MedicationKnowledge';

import example1R4 from '../../../fixtures/r4/resources/medicationKnowledge/example1.json';
import example2R4 from '../../../fixtures/r4/resources/medicationKnowledge/example2.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render MedicationKnowledge component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1R4,
    };

    const { getByAltText } = render(<MedicationKnowledge {...defaultProps} />);
    const headerIcon = getByAltText('medication knowledge');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1R4,
      fhirIcons: false,
    };

    const { getByTestId } = render(<MedicationKnowledge {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1R4,
      fhirIcons: (
        <img
          src={require('../assets/containers/MedicationKnowledge/medication-knowledge.svg')}
          alt="pill database"
        />
      ),
    };

    const { getByAltText } = render(<MedicationKnowledge {...defaultProps} />);
    const headerIcon = getByAltText('pill database');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1R4,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<MedicationKnowledge {...defaultProps} />);
    const headerIcon = getByAltText('pill database');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1R4,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<MedicationKnowledge {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example1R4,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId } = render(
      <MedicationKnowledge {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('example');
    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('code').textContent).toContain('Vancomycin');
    expect(getByTestId('manufacturer').textContent).toContain('#org4');
    expect(getByTestId('amount').textContent).toContain('50');
    expect(getByTestId('synonym').textContent).toContain('Vancomycin');
  });

  it('should render R4 without daVinci PDex profile', () => {
    const defaultProps = {
      fhirResource: example2R4,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationKnowledge {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('code').textContent).toContain('ibuprofen');
    expect(queryByTestId('usdfExtensions')).toBeNull();
  });

  it('should render R4 with daVinci PDex profile', () => {
    const defaultProps = {
      fhirResource: example2R4,
      fhirVersion: fhirVersions.R4,
      withDaVinciPDex: true,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationKnowledge {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('code').textContent).toContain('ibuprofen');

    expect(queryByTestId('usdfExtensions')).not.toBeNull();
    expect(getByTestId('usdfPriorAuthorization').textContent).toContain('no');
    expect(getByTestId('usdfStepTherapyLimit').textContent).toContain('no');
    expect(getByTestId('usdfQuantityLimit').textContent).toContain('no');
    expect(getByTestId('usdfPlanID').textContent).toContain('Kansas');
    expect(getByTestId('usdfDrugTierID').textContent).toContain(
      '(preferred-generic)',
    );
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2R4,
      fhirVersion: fhirVersions.R4,
      withDaVinciPDex: true,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <MedicationKnowledge {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');

    fireEvent.click(accordion);

    expect(onClick).toHaveBeenCalled();
  });
});
