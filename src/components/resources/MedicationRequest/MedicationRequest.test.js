import React from 'react';
import { render } from '@testing-library/react';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';

describe('should render MedicationRequest component properly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('medication').textContent).toContain(
      'Medication/med0316',
    );
    expect(getByTestId('reasonCode').textContent).toContain(
      'ReasonEssential hypertension',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take one tablet',
    );
  });
  it('should render with STU3 source data in which medicationReference key does not exist', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
    };

    const { getByTestId } = render(<MedicationRequest {...defaultProps} />);

    expect(getByTestId('medication').textContent).toContain('250mg capsule');
  });
});
