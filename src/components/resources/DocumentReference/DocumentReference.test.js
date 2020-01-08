import React from 'react';
import { render } from '@testing-library/react';

import fhirTypes from '../fhirResourceTypes';
import DocumentReference from './DocumentReference';

import dstu2Example1 from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/documentReference/example1.json';

// http://www.fileformat.info/info/unicode/char/00a0/index.htm
const nbsp = /\u00a0/g;

describe('should render the DocumentReference component properly', () => {
  it('should render with DSTU2 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirTypes.DSTU2}
      />,
    );

    expect(getByTestId('description').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('type').textContent.split(nbsp)).toEqual([
      'Outpatient Note',
      '(34108-1)',
      'http://loinc.org',
    ]);
    expect(getByTestId('class').textContent.split(nbsp)).toEqual([
      'History and Physical',
      '(History and Physical)',
      'http://ihe.net/xds/connectathon/classCodes',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbsp)).toEqual([
      'very restricted',
      '(V)',
      'http://hl7.org/fhir/v3/Confidentiality',
    ]);
    expect(getByTestId('context.event').textContent.split(nbsp)).toEqual([
      'Arm',
      '(T-D8200)',
      'http://ihe.net/xds/connectathon/eventCodes',
    ]);
  });

  it.skip('should render participants with DSTU2 source data', () => {
    const { getAllByTestId } = (
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirTypes.DSTU2}
      />
    );
  });

  it('should render with STU3 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={stu3Example1}
        fhirVersion={fhirTypes.STU3}
      />,
    );

    expect(getByTestId('description').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('type').textContent.split(nbsp)).toEqual([
      'Outpatient Note',
      '(34108-1)',
      'http://loinc.org',
    ]);
    expect(getByTestId('class').textContent.split(nbsp)).toEqual([
      'History and Physical',
      '(History and Physical)',
      'http://ihe.net/xds/connectathon/classCodes',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbsp)).toEqual([
      'very restricted',
      '(V)',
      'http://hl7.org/fhir/v3/Confidentiality',
    ]);
    expect(getByTestId('context.event').textContent.split(nbsp)).toEqual([
      'Arm',
      '(T-D8200)',
      'http://ihe.net/xds/connectathon/eventCodes',
    ]);
  });
});
