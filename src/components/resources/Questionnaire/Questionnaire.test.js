import React from 'react';
import { render } from '@testing-library/react';

import Questionnaire from './Questionnaire';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaire/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaire/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/questionnaire/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/questionnaire/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/questionnaire/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/questionnaire/example2.json';

describe('Questionnaire should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire 1 ',
    );
    expect(getByTestId('status').textContent).toEqual('published');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      'General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toEqual(
      '2.1What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      '2.2What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      '2.3What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      '2.4What is your marital status?',
    );
  });

  it('should render component correctly with DSTU2 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: dstu2Example2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('2012-01');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORBIDITY)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('(COMORBCAR)');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire ',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      '2General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toContain(
      '2.1What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      '2.2What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      '2.3What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      '2.4What is your marital status?',
    );
  });

  it('should render component correctly with STU3 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('2012-01');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(COMORBCAR)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('Angina Pectoris');
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Lifelines Questionnaire ',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(getByTestId('dateTime').textContent).toEqual('2010');

    // contain subgroup description
    expect(String(getByTestId('linkId-2').textContent).trim()).toContain(
      '2General questions',
    );

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-2.1').textContent).trim()).toContain(
      '2.1What is your gender?',
    );
    expect(String(getByTestId('linkId-2.2').textContent).trim()).toEqual(
      '2.2What is your date of birth?',
    );
    expect(String(getByTestId('linkId-2.3').textContent).trim()).toEqual(
      '2.3What is your country of birth?',
    );
    expect(String(getByTestId('linkId-2.4').textContent).trim()).toEqual(
      '2.4What is your marital status?',
    );
  });

  it('should render component correctly with R4 source data with nested group of questions', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Questionnaire {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Cancer Quality Forum Questionnaire',
    );
    expect(getByTestId('status').textContent).toEqual('draft');
    expect(getByTestId('dateTime').textContent).toEqual('2012-01');

    // contain id and test of questions of subgroup
    expect(String(getByTestId('linkId-1.1').textContent).trim()).toContain(
      '(COMORB)',
    );
    expect(String(getByTestId('linkId-1.1.1').textContent).trim()).toContain(
      '(CARDIAL)',
    );
    expect(String(getByTestId('linkId-1.1.1.1').textContent).trim()).toContain(
      '(COMORBCAR)',
    );
    expect(
      String(getByTestId('linkId-1.1.1.1.1').textContent).trim(),
    ).toContain('Angina Pectoris');
  });
});
