import React from 'react';
import { render } from '@testing-library/react';

import { nbspRegex } from '../../../testUtils';
import fhirVersions from '../fhirResourceVersions';
import DocumentReference from './DocumentReference';

import dstu2Example1 from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/documentReference/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/documentReference/example1.json';

describe('should render the DocumentReference component properly', () => {
  it('should render with DSTU2 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirVersions.DSTU2}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(getByTestId('class').textContent.split(nbspRegex)).toEqual([
      'History and Physical',
      '(History and Physical)',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with DSTU2 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirVersions.DSTU2}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Link']);
  });

  it('should render with STU3 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={stu3Example1}
        fhirVersion={fhirVersions.STU3}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(getByTestId('class').textContent.split(nbspRegex)).toEqual([
      'History and Physical',
      '(History and Physical)',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with STU3 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={stu3Example1}
        fhirVersion={fhirVersions.STU3}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Link']);
  });

  it('should render with R4 source data', () => {
    const { getByTestId, queryByTestId } = render(
      <DocumentReference
        fhirResource={r4Example1}
        fhirVersion={fhirVersions.R4}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(queryByTestId('docStatus')).toBeNull();
    expect(getByTestId('createdAt').textContent).toEqual('2005-12-24');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(queryByTestId('class')).toBeNull();
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with R4 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={r4Example1}
        fhirVersion={fhirVersions.R4}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Link']);
  });
});
