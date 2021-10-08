import React from 'react';
import { render } from '@testing-library/react';

import MedicationAdministration from './MedicationAdministration';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationAdministration/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationAdministration/example3.json';

describe('should render MedicationAdministration component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
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

    expect(getByTestId('periodTimeStart').textContent).toEqual('1/15/2015');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('1/15/2015');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('80 mg');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0301');

    expect(getByTestId('patient').textContent).toContain('Donald Duck');

    expect(getByTestId('practitioner').textContent).toContain('Patrick Pump');

    expect(getByTestId('periodTimeStart').textContent).toEqual('1/15/2015');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('-');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('500 mg');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toContain('#med0303');
    expect(getByTestId('status').textContent).toContain('on-hold');
    expect(getByTestId('patient').textContent).toContain('Donald Duck');
    expect(queryByTestId('practitioner')).toBeNull();
    expect(getByTestId('periodTimeStart').textContent).toEqual('1/15/2015');
    expect(getByTestId('periodTimeEnd').textContent).toEqual('1/15/2015');
    expect(getByTestId('dosageRoute').textContent).toContain('-');
    expect(getByTestId('dosageQuantity').textContent).toEqual('-');
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toContain('#med0306');
    expect(getByTestId('status').textContent).toContain('completed');
    expect(getByTestId('patient').textContent).toContain('Donald Duck');
    expect(getByTestId('practitioner').textContent).toContain('Patrick Pump');
    expect(getByTestId('periodTimeStart').textContent).toEqual('1/15/2015');
    expect(getByTestId('periodTimeEnd').textContent).toEqual('1/15/2015');
    expect(getByTestId('dosageRoute').textContent).toContain('Oral Route');
    expect(getByTestId('dosageQuantity').textContent).toEqual('2 TAB');
  });
});
