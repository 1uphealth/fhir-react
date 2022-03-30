import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FamilyMemberHistory from './FamilyMemberHistory';
import fhirVersions from '../fhirResourceVersions';

import example1DSTU2 from '../../../fixtures/dstu2/resources/familyMemberHistory/example1.json';
import example1STU3 from '../../../fixtures/stu3/resources/familyMemberHistory/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render FamilyMemberHistory component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<FamilyMemberHistory {...defaultProps} />);
    const headerIcon = getByAltText('family member history');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<FamilyMemberHistory {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/FamilyMemberHistory/family-member-history.svg')}
          alt="family member history"
        />
      ),
    };

    const { getByAltText } = render(<FamilyMemberHistory {...defaultProps} />);
    const headerIcon = getByAltText('family member history');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<FamilyMemberHistory {...defaultProps} />);
    const headerIcon = getByAltText('family member history');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<FamilyMemberHistory {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: example1DSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { container, getByTestId } = render(
      <FamilyMemberHistory {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toEqual('Heart Attack');
    expect(getByTestId('patient').textContent).toContain('Peter Patient');
    expect(getByTestId('hasRelationship').textContent).toContain('father');
    expect(getByTestId('noteText').textContent).toContain('Was fishing at');
  });

  it('STU3', () => {
    const defaultProps = {
      fhirResource: example1STU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { container, getByTestId } = render(
      <FamilyMemberHistory {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toEqual('Heart Attack');
    expect(getByTestId('patient').textContent).toContain('Peter Patient');
    expect(getByTestId('hasRelationship').textContent).toContain('father');
    expect(getByTestId('noteText').textContent).toContain('Was fishing at');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example1STU3,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <FamilyMemberHistory {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example1STU3,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <FamilyMemberHistory {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
