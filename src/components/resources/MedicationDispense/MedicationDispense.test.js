import React from 'react';
import { render, within } from '@testing-library/react';
import MedicationDispense from './MedicationDispense';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationDispense/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationDispense/example1.json';
import R4Example2 from '../../../fixtures/r4/resources/medicationDispense/example2.json';

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
    expect(getByTestId('whenPrepared').textContent).toContain('3/1/2015');
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'or after food',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Capecitabine');
    expect(queryByTestId('whenPrepared')).toBeNull();
    expect(getByTestId('medicationCoding').textContent).toContain(
      'Capecitabine 500mg oral tablet',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'doral administration',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: R4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId } = render(
      <MedicationDispense {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Novolog 100u/ml');
    expect(getByTestId('whenPrepared').textContent).toEqual('1/15/2015');
    expect(
      within(getByTestId('hasDosageInstruction'))
        .queryAllByTestId('dosageTiming')
        .map(n => n.textContent),
    ).toEqual(['1 / d', '1 / d', '1 / d']);

    expect(
      within(getByTestId('hasDosageInstruction'))
        .queryAllByTestId('dosageQuantity')
        .map(n => n.textContent),
    ).toEqual(['10 U', '15 U', '20 U']);

    expect(
      within(getByTestId('hasDosageInstruction'))
        .queryAllByTestId('dosageAdditionalInstructions')
        .map(n =>
          String(n.textContent)
            .split('')
            .map(el => String(el).trim())
            .join(''),
        ),
    ).toEqual(['Ordered(ordered)', 'Ordered(ordered)', 'Ordered(ordered)']);
  });
});
