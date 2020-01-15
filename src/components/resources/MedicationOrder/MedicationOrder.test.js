import React from 'react';
import { render } from '@testing-library/react';

import MedicationOrder from './MedicationOrder';

import example from '../../../fixtures/dstu2/resources/medicationOrder/example.json';

describe('should render MedicationOrder component properly', () => {
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
