import React from 'react';
import { render } from '@testing-library/react';

import fhirTypes from '../fhirResourceTypes';
import DocumentReference from './DocumentReference';

import dstu2Example1 from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/documentReference/example1.json';

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
    expect(getByTestId('type').textContent).toEqual('Outpatient Note');
    expect(getByTestId('class').textContent).toEqual('History and Physical');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('securityLabel').textContent).toEqual('very restricted');
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
    expect(getByTestId('type').textContent).toEqual('Outpatient Note');
    expect(getByTestId('class').textContent).toEqual('History and Physical');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('securityLabel').textContent).toEqual('very restricted');
  });
});
