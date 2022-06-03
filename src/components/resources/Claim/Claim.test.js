import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Claim from './Claim';
import fhirVersions from '../fhirResourceVersions';
import { nbspRegex } from '../../../testUtils';
import dstu2Example1 from '../../../fixtures/dstu2/resources/claim/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/claim/example-1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/claim/example-2.json';
import stu3Example3 from '../../../fixtures/stu3/resources/claim/example-3.json';
import r4Example1 from '../../../fixtures/r4/resources/claim/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render the Claim component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<Claim {...defaultProps} />);
    const headerIcon = getByAltText('claim');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Claim {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Claim/claim.svg')}
          alt="claim"
        />
      ),
    };

    const { getByAltText } = render(<Claim {...defaultProps} />);
    const headerIcon = getByAltText('claim');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Claim {...defaultProps} />);
    const headerIcon = getByAltText('clipboard with a symmetrical cross');

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

    const { getByAltText } = render(<Claim {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
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
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
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

    expect(getByTestId('accident.date').textContent).toEqual('07/09/2014');
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
      '08/16/2014 - 08/16/2014',
    );
  });

  it('including the hospitalization period with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Claim {...defaultProps} />);

    expect(getByTestId('hospitalization').textContent).toEqual(
      '08/15/2014 - 08/16/2014',
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

  it('including the items with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getAllByTestId } = render(<Claim {...defaultProps} />);

    const sequences = getAllByTestId('items.sequence').map(n => n.textContent);
    const services = getAllByTestId('items.service')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const unitPrices = getAllByTestId('items.unitPrice')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const quantities = getAllByTestId('items.quantity')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const netPrices = getAllByTestId('items.net')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));

    expect(sequences).toEqual([
      '1',
      '1.1',
      '1.2',
      '1.2.1',
      '1.2.2',
      '1.2.3',
      '1.3',
    ]);
    expect(services).toEqual([
      ' (glasses)',
      ' (frame)',
      ' (lens)',
      ' (lens)',
      ' (hardening)',
      ' (UV coating)',
      ' (fst)',
    ]);
    expect(unitPrices).toEqual([
      '235.4 USD',
      '100 USD × 1.1',
      '55 USD',
      '30 USD × 1.1',
      '15 USD × 1.1',
      '5 USD × 1.1',
      '220 USD × 0.07',
    ]);
    expect(quantities).toEqual(['-', '-', '2', '2', '2', '2', '-']);
    expect(netPrices).toEqual([
      '235.4 USD',
      '110 USD',
      '110 USD',
      '66 USD',
      '33 USD',
      '11 USD',
      '15.4 USD',
    ]);
  });

  it('with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <Claim {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Claim #100150');
    expect(getByTestId('use').textContent).toEqual('claim');
    expect(getByTestId('type').textContent).toContain('oral');
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
    expect(getByTestId('priority').textContent).toContain('normal');
    expect(getByTestId('insurer').textContent).toEqual('Organization/2');
    expect(getByTestId('payee.type').textContent).toContain('provider');
    expect(queryAllByTestId('careTeam')).toHaveLength(1);
    expect(queryAllByTestId('diagnosis')).toHaveLength(1);
    expect(queryAllByTestId('accident')).toHaveLength(0);
    expect(queryAllByTestId('insurance')).toHaveLength(1);
  });

  it('including the items with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getAllByTestId } = render(<Claim {...defaultProps} />);

    const sequences = getAllByTestId('items.sequence').map(n => n.textContent);
    const services = getAllByTestId('items.service')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const unitPrices = getAllByTestId('items.unitPrice')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const quantities = getAllByTestId('items.quantity')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));
    const netPrices = getAllByTestId('items.net')
      .map(n => n.textContent)
      .map(t => t.replace(nbspRegex, ' '));

    expect(sequences).toEqual(['1']);
    expect(services).toEqual([' (1200)']);
    expect(unitPrices).toEqual(['135.57 USD']);
    expect(quantities).toEqual(['-']);
    expect(netPrices).toEqual(['135.57 USD']);
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(<Claim {...defaultProps} onClick={onClick} />);
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
    const { getByRole } = render(<Claim {...defaultProps} onClick={onClick} />);
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
