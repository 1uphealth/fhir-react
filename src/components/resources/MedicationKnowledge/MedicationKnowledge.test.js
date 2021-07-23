import React from 'react';
import { render } from '@testing-library/react';

import { fhirVersions } from '../../../index';

import MedicationKnowledge from './MedicationKnowledge';

import example1R4 from '../../../fixtures/r4/resources/medicationKnowledge/example1.json';
import example2R4 from '../../../fixtures/r4/resources/medicationKnowledge/example2.json';

describe('should render MedicationKnowledge component properly', () => {
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
});
