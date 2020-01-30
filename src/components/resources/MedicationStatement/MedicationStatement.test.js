import React from 'react';
import { render } from '@testing-library/react';
import MedicationStatement from './MedicationStatement';
import fhirVersions from '../fhirResourceVersions';
import example1MedicationStatement from '../../../fixtures/dstu2/resources/medicationStatement/example1.json';
import stu3Example from '../../../fixtures/stu3/resources/medicationStatement/example1.json';

describe('should render MedicationStatement component correctly', () => {
  it('with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<MedicationStatement {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'amphetamine-dextroamphetamine',
    );
    expect(getByTestId('hasEffectivePeriod').textContent).toContain('from');

    expect(getByTestId('dosageInstruction').textContent).toContain(
      'Take 1 capsule',
    );
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, queryAllByTestId } = render(
      <MedicationStatement {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('');
    expect(queryAllByTestId('hasEffectivePeriod')).toHaveLength(0);

    expect(getByTestId('dosageInstruction').textContent).toContain(
      '1-2 tablets once daily',
    );

    expect(getByTestId('hasNote').textContent).toContain('occasional');

    expect(getByTestId('hasReasonCode').textContent).toContain('Legs');
  });
});
