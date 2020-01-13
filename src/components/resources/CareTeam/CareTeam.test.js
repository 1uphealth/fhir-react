import React from 'react';
import { render } from '@testing-library/react';

import CareTeam from './CareTeam';

import stu3Example1 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/careTeam/example2.json';

describe('should render the CareTeam component properly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { getByTestId } = render(<CareTeam {...defaultProps} />);

    expect(getByTestId('title').textContent).toEqual(
      'Peter James Charlmers Care Plan for Inpatient Encounter',
    );
    expect(getByTestId('status').textContent).toEqual('active');
    expect(getByTestId('periodStart').textContent).toEqual('-');
    expect(getByTestId('periodEnd').textContent).toEqual('2013-01-01');
  });

  it('should render participants with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
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
    expect(periodEnds).toEqual(['-', '2013-01-01']);
  });

  it('should render participants with STU3 source data when structure source data of Participants Role is coding array', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
    };

    const { getAllByTestId } = render(<CareTeam {...defaultProps} />);

    const roles = getAllByTestId('participant.role').map(n => n.textContent);
    expect(roles).toEqual(['Healthcare professional']);
  });
});
