import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ReferralRequest from './ReferralRequest';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/referralRequest/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/referralRequest/example1.json';

import fhirIcons from '../../../fixtures/example-icons';

describe('should render ReferralRequest component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<ReferralRequest {...defaultProps} />);
    const headerIcon = getByAltText('referral request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<ReferralRequest {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/ReferralRequest/referral-request.svg')}
          alt="referral request"
        />
      ),
    };

    const { getByAltText } = render(<ReferralRequest {...defaultProps} />);
    const headerIcon = getByAltText('referral request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<ReferralRequest {...defaultProps} />);
    const headerIcon = getByAltText('referral request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<ReferralRequest {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <ReferralRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Referral for service');
    expect(getByTestId('dateSent').textContent).toContain('2/14/2014');
    expect(getByTestId('reason').textContent).toContain(
      'For consideration of Grommets',
    );
    expect(getByTestId('subject').textContent).toContain('Beverly Weaver');
    expect(getByTestId('requester').textContent).toEqual('Serena Shrink');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <ReferralRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'Patient referral to specialist',
    );
    expect(getByTestId('dateSent').textContent).toContain('2/14/2014');
    expect(getByTestId('reason').textContent).toContain(
      'For consideration of Grommets',
    );
    expect(getByTestId('subject').textContent).toContain('Beverly Weaver');
    expect(getByTestId('requester').textContent).toEqual('Serena Shrink');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <ReferralRequest {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <ReferralRequest {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
