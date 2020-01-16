import React from 'react';
import { render } from '@testing-library/react';

import MedicationDispense from './MedicationDispense';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';

describe('should render Device component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual('prescribed medication');
    expect(getByTestId('typeCoding').textContent).toContain('Part Fill');
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'or after food',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Capecitabine');
    expect(getByTestId('medicationCoding').textContent).toContain(
      'Capecitabine 500mg oral tablet',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'doral administration',
    );
  });
});
