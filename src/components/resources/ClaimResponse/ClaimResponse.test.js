import React from 'react';
import { render } from '@testing-library/react';

import ClaimResponse from './ClaimResponse';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/claimResponse/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claimResponse/example-1.json';

describe('should render the ClaimResponse component properly', () => {
  it('with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<ClaimResponse {...defaultProps} />);

    expect(getByTestId('title').textContent).toEqual('Claim response #R3500');
    expect(getByTestId('outcome').textContent).toEqual('complete');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<ClaimResponse {...defaultProps} />);

    expect(getByTestId('title').textContent).toEqual('Claim response #R3500');
    expect(getByTestId('outcome').textContent).toEqual('complete');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
  });
});
