import ExplanationOfBenefit from './ExplanationOfBenefit';
import React from 'react';
import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
import exampleC4BB from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExample.json';
import exampleC4BBExtendedDiagnosis from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExtendedDiagnosis.json';
import fhirVersions from '../fhirResourceVersions';
import { nbspRegex } from '../../../testUtils';
import { fireEvent, render } from '@testing-library/react';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render ExplanationOfBenefit component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<ExplanationOfBenefit {...defaultProps} />);
    const headerIcon = getByAltText('explanation of benefit');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<ExplanationOfBenefit {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/ExplanationOfBenefit/explanation-of-benefit.svg.svg')}
          alt="explanation of benefit"
        />
      ),
    };

    const { getByAltText } = render(<ExplanationOfBenefit {...defaultProps} />);
    const headerIcon = getByAltText('explanation of benefit');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<ExplanationOfBenefit {...defaultProps} />);
    const headerIcon = getByAltText('explanation of benefit');

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

    const { getByAltText } = render(<ExplanationOfBenefit {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('08/16/2014');
    expect(getByTestId('insurer').textContent).toContain('Organization/2');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: example1Stu3,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Claim settled as ');
    expect(getByTestId('created').textContent).toContain('08/16/2014');
    expect(getByTestId('metricAmount').textContent).toContain('$135.57');
    expect(
      getByTestId('planDiscount').textContent.replace(nbspRegex, ' '),
    ).toContain('$96.00');
    expect(getByTestId('hasServices').textContent).toContain('(1200)');
  });

  it('should render with STU3 source data which contains the information data', () => {
    const defaultProps = {
      fhirResource: example2Stu3,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('hasInformation').textContent).toContain(
      'Dispense as Written',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example1R4,
      fhirVersion: fhirVersions.R4,
    };

    const {
      container,
      getByTestId,
      queryByTestId,
      getAllByTestId,
      getAllByRole,
    } = render(<ExplanationOfBenefit {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual(
      'Claim settled as per contract.',
    );
    expect(getByTestId('created').textContent).toEqual('08/16/2014');
    expect(getByTestId('insurer').textContent).toEqual('Organization/3');
    expect(getByTestId('provider').textContent).toEqual('Practitioner/1');
    expect(getByTestId('totalSum').textContent).toContain('135.57');
    expect(getByTestId('purpose').textContent).toEqual('claim');
    expect(getByTestId('patient').textContent).toEqual('Patient/pat1');
    expect(getByTestId('insurance').textContent).toEqual('Coverage/9876B1');

    expect(queryByTestId('hasServices')).not.toBeNull();

    // checking if text content of each header cell is equal to mocked data
    const headerCells = getAllByRole('columnheader')
      .slice(0, 4)
      .map(x => x.textContent);
    expect(headerCells).toEqual([
      'Service',
      'Service date',
      'Quantity',
      'Item cost',
    ]);

    // checking if text content of each column is equal to mocked data
    const explanationService = getAllByTestId('explanation.service').map(
      n => n.textContent,
    );
    const expectedArray = ['(1205)', '(group)'];
    explanationService.forEach((x, i) => expect(x).toContain(expectedArray[i]));

    const explanationServicedDate = getAllByTestId(
      'explanation.servicedDate',
    ).map(n => n.textContent);
    expect(explanationServicedDate).toEqual(['08/16/2014', '08/16/2014']);

    const explanationQuantity = getAllByTestId('explanation.quantity').map(
      n => n.textContent,
    );
    expect(explanationQuantity).toEqual(['-', '-']);

    const explanationItemCost = getAllByTestId('explanation.itemCost').map(
      n => n.textContent,
    );
    expect(explanationItemCost).toEqual([
      `135.57${String.fromCharCode(160)}USD`,
      `200${String.fromCharCode(160)}USD`,
    ]);

    expect(queryByTestId('hasInformation')).toBeNull();
    expect(queryByTestId('totalBenefit')).toBeNull();
    expect(queryByTestId('totalCost')).toBeNull();
  });

  it('should not render C4BB fields without profile set in the params', () => {
    const defaultProps = {
      fhirResource: exampleC4BB,
      fhirVersion: fhirVersions.R4,
      profiles: [],
    };

    const { container, queryByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(queryByTestId('outcome')).toBeNull();
    expect(queryByTestId('insurer')).toBeNull();
    expect(queryByTestId('related')).toBeNull();
    expect(queryByTestId('diagnosisType')).toBeNull();
    expect(queryByTestId('supportingInfo.category')).toBeNull();
    expect(queryByTestId('supportingInfo.timingDate')).toBeNull();
    expect(queryByTestId('items.level')).toBeNull();
    expect(queryByTestId('items.sequence')).toBeNull();
    expect(queryByTestId('items.sequence')).toBeNull();
  });

  it('should render with C4BB source data', () => {
    const defaultProps = {
      fhirResource: exampleC4BB,
      fhirVersion: fhirVersions.R4,
      withCarinBBProfile: true,
    };

    const {
      container,
      getByTestId,
      queryByTestId,
      queryAllByTestId,
      getAllByTestId,
      getAllByRole,
    } = render(<ExplanationOfBenefit {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('created').textContent).toEqual('01/05/2017');
    expect(getByTestId('identifier').textContent).toContain(
      'c145d3fe-d56e-dc26-75e9-01e90672f506',
    );
    expect(getByTestId('outcome').textContent).toEqual('complete');
    expect(queryByTestId('insurer')).toBeNull();
    expect(getByTestId('provider').textContent).toEqual(
      'Practitioner/820ee8ba-855a-3aaf-9eeb-6603cfdaee25',
    );
    expect(getByTestId('totalSum').textContent).toContain('77.49');
    expect(getByTestId('payment').textContent).toContain('117.136');
    expect(getByTestId('payee').textContent).toContain(
      'Organization/iAxXvHiphwGGAL48m3B7XXtKlLZg6yXnC1ch84x1up',
    );
    expect(getByTestId('billablePeriod').textContent).toEqual(
      'From: 01/05/2017; To: 01/05/2018',
    );
    expect(getByTestId('patient').textContent).toEqual(
      'Patient/f56391c2-dd54-b378-46ef-87c1643a2ba0',
    );
    expect(getByTestId('related').textContent).toContain(
      'ExplanationOfBenefit/EqUVAXt5WrNnlJPdB7swbxJXaYxxnvBxWwGPxUx1up',
    );
    expect(queryByTestId('codeableConcept')).toBeNull();
    expect(getByTestId('reference').textContent).toEqual(
      'Condition/88bd5ac6-175b-5906-a4ee-6eedd667b0cc',
    );
    expect(getByTestId('diagnosisType').textContent).toContain('principal');
    expect(getByTestId('supportingInfo.0.category').textContent).toContain(
      'clmrecvddate',
    );
    expect(getByTestId('supportingInfo.0.timingDate').textContent).toEqual(
      '01/05/2017',
    );
    expect(getByTestId('supportingInfo.1.category').textContent).toContain(
      'dayssupply',
    );
    expect(getByTestId('supportingInfo.1.valueQuantity').textContent).toContain(
      '30',
    );
    // checking if text content of each header cell is equal to mocked data
    const headerCells = getAllByRole('columnheader')
      .slice(0, 4)
      .map(x => x.textContent);
    expect(headerCells).toEqual([
      'Service',
      'Service date',
      'Quantity',
      'Item cost',
    ]);

    // checking if text content of first column is equal to mocked data
    const explanationService = getAllByTestId('explanation.service').map(
      n => n.textContent,
    );
    const expectedArray = [
      'Encounter for symptom (185345009)',
      'Acute bronchitis (disorder) (10509002)',
      'Measurement of respiratory function (procedure) (23426006)',
    ];
    const replaceWhitespaces = text => text.replace(/\s+/g, ' ');
    explanationService.forEach((x, i) => {
      expect(replaceWhitespaces(x)).toEqual(
        replaceWhitespaces(expectedArray[i]),
      );
    });

    expect(queryAllByTestId('items.level')).not.toBeNull();
    expect(queryAllByTestId('items.sequence')).not.toBeNull();
    expect(queryAllByTestId('items.sequence')).toHaveLength(3);
  });

  it('should render C4BB diagnosis fields', () => {
    const defaultProps = {
      fhirResource: exampleC4BBExtendedDiagnosis,
      fhirVersion: fhirVersions.R4,
      withCarinBBProfile: true,
    };

    const { container, queryByTestId, getByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('diagnosisOnAdmission').textContent).toContain('?');
    expect(queryByTestId('diagnosisPackageCode')).toBeNull();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: exampleC4BBExtendedDiagnosis,
      fhirVersion: fhirVersions.R4,
      withCarinBBProfile: true,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <ExplanationOfBenefit {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: exampleC4BBExtendedDiagnosis,
      fhirVersion: fhirVersions.R4,
      withCarinBBProfile: true,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <ExplanationOfBenefit {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
