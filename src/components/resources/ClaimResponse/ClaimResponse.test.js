import React from 'react';
import { render } from '@testing-library/react';

import ClaimResponse from './ClaimResponse';
import fhirVersions from '../fhirResourceVersions';
import { nbspRegex } from '../../../testUtils';
import dstu2Example1 from '../../../fixtures/dstu2/resources/claimResponse/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claimResponse/example-1.json';

describe('should render the ClaimResponse component properly', () => {
  it('with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId, getAllByTestId } = render(
      <ClaimResponse {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim response #R3500');
    expect(getByTestId('outcome').textContent).toEqual('complete');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
    expect(getByTestId('disposition').textContent).toEqual(
      'Claim settled as per contract.',
    );
    expect(getByTestId('request').textContent).toEqual(
      'http://www.BenefitsInc.com/fhir/oralhealthclaim/15476332402',
    );
    expect(
      getByTestId('totalCost').textContent.replace(nbspRegex, ' '),
    ).toEqual('135.57 USD');
    expect(
      getByTestId('totalBenefit').textContent.replace(nbspRegex, ' '),
    ).toEqual('100.47 USD');
    expect(getByTestId('payment.type').textContent).toEqual('-');
    expect(
      getByTestId('payment.amount').textContent.replace(nbspRegex, ' '),
    ).toEqual('100.47 USD');
    expect(getByTestId('payment.date').textContent).toEqual('2014-08-31');
    expect(getByTestId('payment.ref').textContent).toEqual('201408-2-1569478');

    expect(
      getAllByTestId('items.adjudication').map(n =>
        Array.from(
          n.querySelectorAll(
            '[data-testid="items.adjudication.singleAdjudication"]',
          ),
        )
          .map(n => n.textContent)
          .map(t => t.replace(nbspRegex, ' ')),
      ),
    ).toEqual([
      [
        ' (eligible):135.57 USD',
        ' (copay):10 USD',
        ' (eligpercent):80',
        ' (benefit):100.47 USD',
      ],
    ]);
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, getAllByTestId } = render(
      <ClaimResponse {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim response #R3500');
    expect(getByTestId('outcome').textContent).toEqual('complete');
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
    expect(getByTestId('disposition').textContent).toEqual(
      'Claim settled as per contract.',
    );
    expect(getByTestId('request').textContent).toEqual(
      'http://www.BenefitsInc.com/fhir/oralhealthclaim/15476332402',
    );
    expect(
      getByTestId('totalCost').textContent.replace(nbspRegex, ' '),
    ).toEqual('135.57 USD');
    expect(
      getByTestId('totalBenefit').textContent.replace(nbspRegex, ' '),
    ).toEqual('100.47 USD');
    expect(getByTestId('payment.type').textContent).toContain('complete');
    expect(
      getByTestId('payment.amount').textContent.replace(nbspRegex, ' '),
    ).toEqual('100.47 USD');
    expect(getByTestId('payment.date').textContent).toEqual('2014-08-31');
    expect(getByTestId('payment.ref').textContent).toEqual('201408-2-1569478');

    expect(
      getAllByTestId('items.adjudication').map(n =>
        Array.from(
          n.querySelectorAll(
            '[data-testid="items.adjudication.singleAdjudication"]',
          ),
        )
          .map(n => n.textContent)
          .map(t => t.replace(nbspRegex, ' ')),
      ),
    ).toEqual([
      [
        ' (eligible):135.57 USD',
        ' (copay):10 USD',
        ' (eligpercent):80',
        ' (benefit):100.47 USD',
      ],
    ]);
  });
});
