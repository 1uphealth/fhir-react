import React from 'react';
import { render } from '@testing-library/react';
import CarePlan from './CarePlan';
import fhirVersions from '../fhirResourceVersions';

import examplecarePlanDSTU2 from '../../../fixtures/dstu2/resources/carePlan/example1.json';
import exampleCarePlanSTU3 from '../../../fixtures/stu3/resources/carePlan/example1.json';
import example1CarePlanR4 from '../../../fixtures/r4/resources/carePlan/weightLossPlan.json';
import example2CarePlanR4 from '../../../fixtures/r4/resources/carePlan/pregnancyPlan.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: examplecarePlanDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('category').textContent).toContain('Longitudinal');
    expect(getByTestId('addresses').textContent).toContain('Dog bite');
    expect(getByTestId('activity').textContent).toContain('ADULT DIET');
    expect(getByTestId('subject').textContent).toEqual('Patient/d47f763e7c7f');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: exampleCarePlanSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('addresses').textContent).toContain('obesity');
    expect(getByTestId('activity').textContent).toContain('3141-9');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('description').textContent).toContain('Manage obesity');
    expect(getByTestId('subject').textContent).toContain('Peter James');
    expect(getByTestId('subject').textContent).toContain('Patient/example');
    expect(getByTestId('author').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('periodEnd').textContent).toEqual('2017-06-01');
    expect(getByTestId('basedOn').textContent).toEqual(
      'Management of Type 2 Diabetes',
    );
    expect(getByTestId('partOf').textContent).toEqual('Overall wellness plan');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example1CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('status').textContent).toContain('active');
    expect(getByTestId('addresses').textContent).toContain('obesity');
    expect(getByTestId('activity').textContent).toContain('3141-9');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('goals').textContent).toEqual('Goal/example');
    expect(getByTestId('description').textContent).toContain('Manage obesity');
    expect(getByTestId('subject').textContent).toContain('Peter James');
    expect(getByTestId('subject').textContent).toContain('Patient/example');
    expect(getByTestId('author').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('periodEnd').textContent).toEqual('2017-06-01');
    expect(getByTestId('basedOn').textContent).toEqual(
      'Management of Type 2 Diabetes',
    );
    expect(getByTestId('partOf').textContent).toEqual('Overall wellness plan');
  });

  it('should render with R4 example2 data', () => {
    const defaultProps = {
      fhirResource: example2CarePlanR4,
      fhirVersion: fhirVersions.R4,
    };
    const { container, getByTestId } = render(<CarePlan {...defaultProps} />);

    expect(container).not.toBeNull();

    expect(getByTestId('addresses').textContent).toContain('pregnancy');
    expect(getByTestId('activity').textContent).toContain('First Antenatal');
    expect(getByTestId('intent').textContent).toEqual('plan');
    expect(getByTestId('goals').textContent).toEqual('#goal');
    expect(getByTestId('subject').textContent).toContain('Eve Everywoman');
    expect(getByTestId('subject').textContent).toContain('Patient/1');
    expect(getByTestId('periodStart').textContent).toEqual('2013-01-01');
    expect(getByTestId('periodEnd').textContent).toEqual('2013-10-01');
  });
});
