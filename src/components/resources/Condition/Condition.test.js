import React from 'react';
import { render } from '@testing-library/react';
import Condition from './Condition';
import fhirVersions from '../fhirResourceVersions';

import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';

import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';

import example1ConditionSeveritySTU4 from '../../../fixtures/stu4/resources/condition/example1.json';
import example2ConditionSeveritySTU4 from '../../../fixtures/stu4/resources/condition/example2.json';

describe('should render component correctly', () => {
  it('DSTU2 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleCondition,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(queryAllByTestId('severity').length).toEqual(0);
  });

  test('DSTU2 - with severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSeverity,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Medium severity');
    expect(getByTestId('onsetDate').textContent).toEqual('2015-08-24');
    expect(getByTestId('asserter').textContent).toEqual(
      'MOORE, NICKPractitioner/f8fedcd9e6e565a21f457909',
    );
  });

  it('STU3 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(queryAllByTestId('severity').length).toEqual(0);
  });

  it('STU3 - with severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSeveritySTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual(
      'Moderate to severe severity',
    );
    expect(getByTestId('onsetDate').textContent).toEqual('2013-03-08');
    expect(getByTestId('asserter').textContent).toEqual('Practitioner/f201');
  });

  it('STU4 - using example1 fixture', () => {
    const defaultProps = {
      fhirResource: example1ConditionSeveritySTU4,
      fhirVersion: fhirVersions.STU4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Severe severity');
    expect(getByTestId('onsetDate').textContent).toEqual('2012-05-24');
    expect(queryAllByTestId('asserter').length).toEqual(0);
    expect(queryAllByTestId('dateRecorded').length).toEqual(0);
  });

  it('STU4 - using example2 fixture', () => {
    const defaultProps = {
      fhirResource: example2ConditionSeveritySTU4,
      fhirVersion: fhirVersions.STU4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Mild severity');
    expect(queryAllByTestId('onsetDate').length).toEqual(0);
    expect(queryAllByTestId('asserter').length).toEqual(0);
    expect(queryAllByTestId('dateRecorded').length).toEqual(0);
  });
});
