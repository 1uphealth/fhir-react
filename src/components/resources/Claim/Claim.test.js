import React from 'react';
import { render } from '@testing-library/react';

import Claim from './Claim';
import fhirVersions from '../fhirResourceVersions';
import { nbspRegex } from '../../../testUtils';
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
    expect(queryAllByTestId('diagnosis')).toHaveLength(1);
    expect(queryAllByTestId('accident')).toHaveLength(0);
    expect(queryAllByTestId('insurance')).toHaveLength(1);
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
    expect(queryAllByTestId('diagnosis')).toHaveLength(1);
    expect(queryAllByTestId('accident')).toHaveLength(0);
    expect(queryAllByTestId('insurance')).toHaveLength(1);
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

  it('including the diagnosis with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getAllByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    const diagnosis = getAllByTestId('diagnosis.diagnosis')
      .map(n => n.textContent)
      .map(t => t.replace(/[\s()]+/g, ''));
    const diagnosisTypes = getAllByTestId('diagnosis.type')
      .map(n => n.textContent)
      .map(t => t.replace(/[\s()]+/g, ''));
    const diagnosisPackageCodes = getAllByTestId('diagnosis.packageCode')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));

    expect(queryAllByTestId('diagnosis')).toHaveLength(1);
    expect(diagnosis).toEqual(['654456']);
    expect(diagnosisTypes).toEqual(['admitting']);
    expect(diagnosisPackageCodes).toEqual(['Head trauma - concussion (400)']);
  });

  it('including the accident with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Claim {...defaultProps} />);

    expect(getByTestId('accident.date').textContent).toEqual('2014-07-09');
    expect(getByTestId('accident.type').textContent).toContain(
      'Sporting Accident',
    );
  });

  it('including the insurance with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getAllByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    const coverage = getAllByTestId('insurance.coverage').map(
      n => n.textContent,
    );
    const businessArrangement = getAllByTestId(
      'insurance.businessArrangement',
    ).map(n => n.textContent);
    const claimResponse = getAllByTestId('insurance.claimResponse').map(
      n => n.textContent,
    );

    expect(queryAllByTestId('insurance')).toHaveLength(1);
    expect(coverage).toEqual(['Coverage/9876B1 (focal)']);
    expect(businessArrangement).toEqual(['BA987123']);
    expect(claimResponse).toEqual(['-']);
  });

  it('including the employment impacted period with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Claim {...defaultProps} />);

    expect(getByTestId('employmentImpacted').textContent).toEqual(
      '2014-08-16 - 2014-08-16',
    );
  });

  it('including the hospitalization period with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Claim {...defaultProps} />);

    expect(getByTestId('hospitalization').textContent).toEqual(
      '2014-08-15 - 2014-08-16',
    );
  });

  it('including the total amount with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Claim {...defaultProps} />);

    expect(getByTestId('total').textContent.replace(nbspRegex, ' ')).toEqual(
      '125 USD',
    );
  });
});
