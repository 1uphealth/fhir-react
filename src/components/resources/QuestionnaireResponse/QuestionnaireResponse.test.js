import React from 'react';
import { render } from '@testing-library/react';

import QuestionnaireResponse from './QuestionnaireResponse';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/questionnaireResponse/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/questionnaireResponse/example3.json';

import stu3Example from '../../../fixtures/stu3/resources/questionnaireResponse/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/questionnaireResponse/example1.json';

describe('QuestionnaireResponse should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<QuestionnaireResponse {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Questionnaire Response',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('dateTime').textContent).toEqual('2013-06-18');
    expect(getByTestId('subject').textContent).toEqual('RoelPatient/f201');
    expect(getByTestId('author').textContent).toEqual('Practitioner/f201');

    expect(getByTestId('linkId-1.1').textContent).toEqual(
      'Do you have allergies?I am allergic to house dust ',
    );
    expect(getByTestId('linkId-2.1').textContent).toEqual(
      'What is your gender?Male ',
    );
    expect(getByTestId('linkId-2.2').textContent).toEqual(
      'What is your date of birth?1960-03-13 ',
    );
    expect(getByTestId('linkId-2.3').textContent).toEqual(
      'What is your country of birth?The Netherlands ',
    );
    expect(getByTestId('linkId-3').textContent).toEqual('Intoxications');
    expect(getByTestId('linkId-3.2').textContent).toEqual(
      'Do you drink alchohol?No, but I used to drink ',
    );
  });

  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<QuestionnaireResponse {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Glasgow Coma Score',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('dateTime').textContent).toEqual('2014-12-11');

    expect(getByTestId('linkId-1.1').textContent).toContain('(LA6560-2) ');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<QuestionnaireResponse {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Questionnaire Response',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('dateTime').textContent).toEqual('2013-02-19');

    expect(getByTestId('answer-nameOfChild-0').textContent).toContain(
      'Cathy Jones',
    );
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<QuestionnaireResponse {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toContain(
      'Questionnaire Response',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('dateTime').textContent).toEqual('2013-06-18');
    expect(getByTestId('subject').textContent).toEqual('RoelPatient/f201');
    expect(getByTestId('author').textContent).toEqual('Practitioner/f201');

    expect(getByTestId('linkId-1.1').textContent).toEqual(
      'Do you have allergies?',
    );
    expect(getByTestId('linkId-2.1').textContent).toEqual(
      'What is your gender?',
    );
    expect(getByTestId('linkId-2.2').textContent).toEqual(
      'What is your date of birth?',
    );
    expect(getByTestId('linkId-2.3').textContent).toEqual(
      'What is your country of birth?',
    );
    expect(getByTestId('linkId-3').textContent).toContain('Intoxications');
    expect(getByTestId('linkId-3.1').textContent).toEqual('Do you smoke?');
    expect(getByTestId('linkId-3.2').textContent).toEqual(
      'Do you drink alchohol?',
    );
  });
});
