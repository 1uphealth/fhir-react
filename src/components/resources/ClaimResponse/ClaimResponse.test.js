import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ClaimResponse from './ClaimResponse';
import fhirVersions from '../fhirResourceVersions';
import { nbspRegex } from '../../../testUtils';
import dstu2Example1 from '../../../fixtures/dstu2/resources/claimResponse/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claimResponse/example-1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/claimResponse/example-2.json';
import r4Example1 from '../../../fixtures/r4/resources/claimResponse/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/claimResponse/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/claimResponse/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render the ClaimResponse component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<ClaimResponse {...defaultProps} />);
    const headerIcon = getByAltText('claim response');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<ClaimResponse {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/ClaimResponse/claim-response.svg')}
          alt="clipboard with a symmetrical cross and a return arrow"
        />
      ),
    };

    const { getByAltText } = render(<ClaimResponse {...defaultProps} />);
    const headerIcon = getByAltText(
      'clipboard with a symmetrical cross and a return arrow',
    );

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<ClaimResponse {...defaultProps} />);
    const headerIcon = getByAltText(
      'clipboard with a symmetrical cross and a return arrow',
    );

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

    const { getByAltText } = render(<ClaimResponse {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
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
    expect(getByTestId('payment.date').textContent).toEqual('08/31/2014');
    expect(
      getByTestId('payment.ref').textContent.replace(nbspRegex, ' '),
    ).toEqual('Identifier: 201408-2-1569478');

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
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
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
    expect(getByTestId('payment.date').textContent).toEqual('08/31/2014');
    expect(
      getByTestId('payment.ref').textContent.replace(nbspRegex, ' '),
    ).toEqual('Identifier: 201408-2-1569478');

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

  it('includes added items with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getAllByTestId } = render(<ClaimResponse {...defaultProps} />);

    const adjucationNodes = getAllByTestId('addedItems.adjudication');
    const singleAdjucations = adjucationNodes
      .map(n =>
        n.querySelectorAll(
          '[data-testid="addedItems.adjudication.singleAdjudication"]',
        ),
      )
      .map(nodes => Array.from(nodes))
      .map(nodes =>
        nodes.map(n => n.textContent).map(t => t.replace(nbspRegex, ' ')),
      );
    expect(singleAdjucations).toEqual([
      [
        ' (eligible):100 USD',
        ' (copay):10 USD',
        ' (eligpercent):80',
        ' (benefit):72 USD',
      ],
      [' (eligible):35.57 USD', ' (eligpercent):80', ' (benefit):28.47 USD'],
      [' (eligible):350 USD', ' (eligpercent):80', ' (benefit):270 USD'],
    ]);

    const services = getAllByTestId('addedItems.service')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    expect(services).toEqual([
      ' (1101)',
      'Radiograph, bytewing (2141)',
      ' (expense)',
    ]);
  });

  it('with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <ClaimResponse {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim response #R3500');
    expect(getByTestId('status').textContent).toEqual('active');
    expect(queryByTestId('outcome')).toBeNull();
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
    expect(getByTestId('disposition').textContent).toEqual(
      'Claim settled as per contract.',
    );
    expect(getByTestId('request').textContent).toEqual(
      'http://www.BenefitsInc.com/fhir/oralhealthclaim/15476332402',
    );
    const totalSectionContent = getByTestId('totalSection').textContent.replace(
      nbspRegex,
      ' ',
    );
    expect(totalSectionContent).toMatch(/SUBMITTED/i);
    expect(totalSectionContent).toContain('135.57 USD');
    expect(totalSectionContent).toMatch(/BENEFIT/i);
    expect(totalSectionContent).toContain('90.47 USD');

    expect(getByTestId('payment.type').textContent).toContain('complete');
    expect(
      getByTestId('payment.amount').textContent.replace(nbspRegex, ' '),
    ).toEqual('100.47 USD');
    expect(getByTestId('payment.date').textContent).toEqual('08/31/2014');
    expect(
      getByTestId('payment.ref').textContent.replace(nbspRegex, ' '),
    ).toEqual('Identifier: 201408-2-1569478');

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
        ' (benefit):90.47 USD',
      ],
    ]);
  });

  it("shouldn't render payment section if there is no data to render - R4", () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };
    const { queryByTestId } = render(<ClaimResponse {...defaultProps} />);

    expect(queryByTestId('paymentSection')).toBeNull();
  });

  it('includes added items with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example3,
      fhirVersion: fhirVersions.R4,
    };
    const { getAllByTestId } = render(<ClaimResponse {...defaultProps} />);

    const adjucationNodes = getAllByTestId('addedItems.adjudication');
    const singleAdjucations = adjucationNodes
      .map(n =>
        n.querySelectorAll(
          '[data-testid="addedItems.adjudication.singleAdjudication"]',
        ),
      )
      .map(nodes => Array.from(nodes))
      .map(nodes =>
        nodes.map(n => n.textContent).map(t => t.replace(nbspRegex, ' ')),
      );
    expect(singleAdjucations).toEqual([
      [
        ' (eligible):100 USD',
        ' (copay):10 USD',
        ' (eligpercent):80',
        ' (benefit):72 USD',
      ],
      [' (eligible):35.57 USD', ' (eligpercent):80', ' (benefit):28.47 USD'],
      [' (eligible):350 USD', ' (eligpercent):80', ' (benefit):270 USD'],
    ]);

    const services = getAllByTestId('addedItems.service')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    expect(services).toEqual([
      ' (1101)',
      'Radiograph, bytewing (2141)',
      ' (expense)',
    ]);
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example3,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getAllByRole } = render(
      <ClaimResponse {...defaultProps} onClick={onClick} />,
    );
    const accordion = getAllByRole('button')[0];
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example3,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getAllByRole } = render(
      <ClaimResponse {...defaultProps} onClick={onClick} />,
    );
    const accordion = getAllByRole('button')[0];
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
