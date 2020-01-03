import React from 'react';
import { render } from '@testing-library/react';

import MedicationDispense from './MedicationDispense';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';

describe('should render Device component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: 'dstu2',
    };

    const { container, getByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('medication').textContent).toContain(
      'Medication/medexample005',
    );
    expect(getByTestId('typeCoding').textContent).toContain('Part Fill');
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Dosage instruction',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: 'stu3',
    };

    const { container, getByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('medication').textContent).toContain('Capecitabine');
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Dosage instruction',
    );
  });
});
