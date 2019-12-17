import React from 'react';
import { render } from '@testing-library/react';
import MedicationStatement from './MedicationStatement';

import example1MedicationStatement from '../../../fixtures/dstu2/resources/MedicationStatement/example1.json';

describe('should render MedicationStatement component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
    };
    const { getByTestId } = render(<MedicationStatement {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'amphetamine-dextroamphetamine',
    );
    expect(getByTestId('status').textContent).toContain('status active');

    expect(getByTestId('dosage').textContent).toContain('Take 1 capsule');
  });
});
