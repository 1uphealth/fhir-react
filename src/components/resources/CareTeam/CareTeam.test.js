import React from 'react';
import { render } from '@testing-library/react';

import CareTeam from './CareTeam';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/careTeam/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/careTeam/example1.json';

describe('should render the CareTeam component properly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { getByTestId, queryByTestId } = render(
      <CareTeam {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual(
      'Peter James Charlmers Care Plan for Inpatient Encounter',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(queryByTestId('periodStart')).toBeNull();
    expect(getByTestId('periodEnd').textContent).toEqual('1/1/2013');
    expect(getByTestId('category').textContent.trim()).toEqual('(encounter)');
    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });

  it('should render participants with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { getAllByTestId } = render(<CareTeam {...defaultProps} />);

    const roles = getAllByTestId('participant.role').map(n => n.textContent);
    expect(roles).toEqual(['responsiblePerson', 'adviser']);
    const names = getAllByTestId('participant.display').map(n => n.textContent);
    expect(names).toEqual(['Peter James Chalmers', 'Dorothy Dietition']);
    const periodStarts = getAllByTestId('participant.periodStart').map(
      n => n.textContent,
    );
    expect(periodStarts).toEqual(['-', '-']);
    const periodEnds = getAllByTestId('participant.periodEnd').map(
      n => n.textContent,
    );
    expect(periodEnds).toEqual(['-', '1/1/2013']);
  });

  it('should render participants with STU3 source data when structure source data of Participants Role is coding array', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };

    const { getAllByTestId } = render(<CareTeam {...defaultProps} />);

    const roles = getAllByTestId('participant.role').map(n => n.textContent);
    expect(roles).toEqual(['Healthcare professional']);
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId, queryByTestId } = render(
      <CareTeam {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual(
      'Peter James Charlmers Care Plan for Inpatient Encounter',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(queryByTestId('periodStart')).toBeNull();
    expect(getByTestId('periodEnd').textContent).toEqual('1/1/2013');
    expect(getByTestId('encounter').textContent).toEqual('Encounter/example');
    expect(getByTestId('category').textContent).toContain(
      'Encounter-focused care team',
    );
    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });

  it('should render participants with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { getAllByTestId } = render(<CareTeam {...defaultProps} />);

    const roles = getAllByTestId('participant.role').map(n => n.textContent);
    expect(roles).toEqual(['-', '-']);
    const names = getAllByTestId('participant.display').map(n => n.textContent);
    expect(names).toEqual(['Peter James Chalmers', 'Dorothy Dietition']);
    const periodStarts = getAllByTestId('participant.periodStart').map(
      n => n.textContent,
    );
    expect(periodStarts).toEqual(['-', '-']);
    const periodEnds = getAllByTestId('participant.periodEnd').map(
      n => n.textContent,
    );
    expect(periodEnds).toEqual(['-', '1/1/2013']);
  });
});
