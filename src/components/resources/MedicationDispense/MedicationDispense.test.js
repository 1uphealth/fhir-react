import React from 'react';
import { render } from '@testing-library/react';

import MedicationDispense from './MedicationDispense';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';

describe('should render Device component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
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
});
