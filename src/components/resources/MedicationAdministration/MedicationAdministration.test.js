import React from 'react';
import { render } from '@testing-library/react';

import MedicationAdministration from './MedicationAdministration';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';

describe('should render MedicationAdministration component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: 'dstu2',
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'Medication/medicationex',
    );

    expect(getByTestId('patient').textContent).toContain('Patient/example');

    expect(getByTestId('practitioner').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('periodTimeStart').textContent).toEqual('2015-01-15');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('2015-01-15');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('80 mg');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: 'stu3',
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0301');

    expect(getByTestId('patient').textContent).toContain('Donald Duck');

    expect(getByTestId('practitioner').textContent).toContain('Patrick Pump');

    expect(getByTestId('periodTimeStart').textContent).toEqual('2015-01-15');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('-');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('500 mg');
  });
});
