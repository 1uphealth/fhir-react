import React from 'react';
import { render } from '@testing-library/react';

import Claim from './Claim';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/claim/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claim/example-1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/claim/example-2.json';

describe('should render the Claim component properly', () => {
  it('with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim #100150');
    expect(getByTestId('use').textContent).toEqual('complete');
    expect(getByTestId('type').textContent).toContain('oral');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
    expect(getByTestId('priority').textContent).toContain('normal');
    expect(getByTestId('insurer').textContent).toEqual('Organization/2');
    expect(getByTestId('payee.type').textContent).toContain('provider');
    expect(queryAllByTestId('careTeam')).toHaveLength(0);
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim #100150');
    expect(getByTestId('use').textContent).toEqual('complete');
    expect(getByTestId('type').textContent).toContain('oral');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
    expect(getByTestId('priority').textContent).toContain('normal');
    expect(getByTestId('insurer').textContent).toEqual('Organization/2');
    expect(getByTestId('payee.type').textContent).toContain('provider');
    expect(queryAllByTestId('careTeam')).toHaveLength(1);
  });

  it('including the members of the careTeam with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getAllByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    const roles = getAllByTestId('careTeam.role')
      .map(n => n.textContent)
      .map(t => t.replace(/[\s()]+/g, ''));
    const qualifications = getAllByTestId('careTeam.qualification')
      .map(n => n.textContent)
      .map(t => t.replace(/[\s()]+/g, ''));
    const providers = getAllByTestId('careTeam.provider').map(
      n => n.textContent,
    );

    expect(queryAllByTestId('careTeam')).toHaveLength(1);
    expect(roles).toEqual(['primary']);
    expect(qualifications).toEqual(['-']);
    expect(providers).toEqual(['Practitioner/example']);
  });
});
