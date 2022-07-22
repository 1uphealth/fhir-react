import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import CareTeam from './CareTeam';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/careTeam/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/careTeam/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/careTeam/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

describe('should render the CareTeam component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };

    const { getByAltText } = render(<CareTeam {...defaultProps} />);
    const headerIcon = getByAltText('care team');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<CareTeam {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/CareTeam/care-team.svg')}
          alt="group of people"
        />
      ),
    };

    const { getByAltText } = render(<CareTeam {...defaultProps} />);
    const headerIcon = getByAltText('group of people');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<CareTeam {...defaultProps} />);
    const headerIcon = getByAltText('group of people');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<CareTeam {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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
    expect(getByTestId('periodEnd').textContent).toEqual('01/01/2013');
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
    expect(periodEnds).toEqual(['-', '01/01/2013']);
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
    expect(getByTestId('periodEnd').textContent).toEqual('01/01/2013');
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
    expect(periodEnds).toEqual(['-', '01/01/2013']);
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <CareTeam {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <CareTeam {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
