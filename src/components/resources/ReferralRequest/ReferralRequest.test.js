import React from 'react';
import { render } from '@testing-library/react';

import ReferralRequest from './ReferralRequest';

import dstu2Example1 from '../../../fixtures/dstu2/resources/referralRequest/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/referralRequest/example1.json';

describe('should render ReferralRequest component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: 'dstu2',
    };

    const { container, getByTestId } = render(
      <ReferralRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('typeCoding').textContent).toContain(
      'Referral for service',
    );
    expect(getByTestId('dateSent').textContent).toContain('2014-02-14');
    expect(getByTestId('reason').textContent).toContain(
      'For consideration of Grommets',
    );
    expect(getByTestId('description').textContent).toContain(
      'In the past 2 years Beverly',
    );
    expect(getByTestId('patient').textContent).toContain('Beverly Weaver');
    expect(getByTestId('requester').textContent).toContain('Serena Shrink');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: 'stu3',
    };

    const { container, getByTestId } = render(
      <ReferralRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('typeCoding').textContent).toContain(
      'Patient referral to specialist',
    );
    expect(getByTestId('dateSent').textContent).toContain('2014-02-14');
    expect(getByTestId('reason').textContent).toContain(
      'For consideration of Grommets',
    );
    expect(getByTestId('description').textContent).toContain(
      'In the past 2 years Beverly',
    );
    expect(getByTestId('patient').textContent).toContain('Beverly Weaver');
    expect(getByTestId('requester').textContent).toContain('Serena Shrink');
  });
});
