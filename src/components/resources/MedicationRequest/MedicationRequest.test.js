import React from 'react';
import { render } from '@testing-library/react';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationRequest/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationRequest/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medicationRequest/example3.json';

describe('should render MedicationRequest component properly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Medication/med0316');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Essential hypertension',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take one tablet',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('2015-03-01');
    expect(getByTestId('intent').textContent).toEqual('order');
  });
  it('should render with STU3 source data in which medicationReference key does not exist', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
    };

    const { getByTestId } = render(<MedicationRequest {...defaultProps} />);

    expect(getByTestId('medication').textContent).toContain('250mg capsule');
  });

  it('should render with R4 source data(example1)', () => {
    const defaultProps = {
      fhirResource: r4Example1,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Medication/med0316');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Essential hypertension',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take one tablet',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('2015-03-01');
    expect(getByTestId('intent').textContent).toEqual('order');
  });

  it('should render with R4 source data(example2)', () => {
    const defaultProps = {
      fhirResource: r4Example2,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0311');
    expect(queryByTestId('reasonCode')).toBeNull();
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take 4 tablets daily',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('2015-01-15');
    expect(getByTestId('intent').textContent).toEqual('order');
  });

  it('should render with R4 source data(example3)', () => {
    const defaultProps = {
      fhirResource: r4Example3,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0304');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Chronic myeloid Leukemia',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      '6 mg PO daily for remission',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('2015-01-15');
    expect(getByTestId('intent').textContent).toEqual('order');
  });
});
