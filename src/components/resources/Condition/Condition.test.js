import Condition from './Condition';
import React from 'react';
import example1ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example1.json';
import example2ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example2.json';
import example3ConditionSeverityR4 from '../../../fixtures/r4/resources/condition/example3.json';
import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import exampleConditionSTU3 from '../../../fixtures/stu3/resources/condition/example.json';
import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';
import exampleConditionSeveritySTU3 from '../../../fixtures/stu3/resources/condition/example-severity.json';
import fhirVersions from '../fhirResourceVersions';
import { render } from '@testing-library/react';

import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('DSTU2 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleCondition,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
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
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Medium severity');
    expect(getByTestId('onsetDate').textContent).toEqual('8/24/2015');
    expect(getByTestId('asserter').textContent).toEqual(
      'MOORE, NICKPractitioner/f8fedcd9e6e565a21f457909',
    );
  });

  it('STU3 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSTU3,
      fhirVersion: fhirVersions.STU3,
      fhirIcons: fhirIcons,
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
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual(
      'Moderate to severe severity',
    );
    expect(getByTestId('onsetDate').textContent).toEqual('3/8/2013');
    expect(getByTestId('asserter').textContent).toEqual('Practitioner/f201');
  });

  it('R4 - using example1 fixture', () => {
    const defaultProps = {
      fhirResource: example1ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Condition {...defaultProps} />,
    );

    expect(getByTestId('clinicalStatus').textContent).toEqual('active');
    expect(getByTestId('severity').textContent).toEqual('Severe severity');
    expect(getByTestId('onsetDate').textContent).toEqual('5/24/2012');
    expect(queryAllByTestId('asserter').length).toEqual(0);
    expect(queryAllByTestId('dateRecorded').length).toEqual(0);
  });

  it('R4 - using example2 fixture', () => {
    const defaultProps = {
      fhirResource: example2ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
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

  it('R4 - using example3 fixture', () => {
    const defaultProps = {
      fhirResource: example3ConditionSeverityR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Condition {...defaultProps} />);

    expect(getByTestId('clinicalStatus').textContent).toEqual('resolved');
    expect(getByTestId('severity').textContent).toEqual('Mild severity');
    expect(getByTestId('onsetDate').textContent).toEqual('4/2/2013');
    expect(getByTestId('asserter').textContent).toEqual('Practitioner/f201');
    expect(getByTestId('dateRecorded').textContent).toEqual('4/4/2013');
  });
});
