import React from 'react';
import { render } from '@testing-library/react';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import { nbspRegex } from '../../../testUtils';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';
import exampleC4BB from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExample.json';
import exampleC4BBExtendedDiagnosis from '../../../fixtures/r4/resources/explanationOfBenefit/c4bbExtendedDiagnosis.json';

describe('should render ExplanationOfBenefit component properly', () => {
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
    expect(getByTestId('created').textContent).toContain('2014-08-16');
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
    expect(getByTestId('created').textContent).toContain('2014-08-16');
    expect(
      getByTestId('totalCost').textContent.replace(nbspRegex, ' '),
    ).toEqual('135.57 USD');
    expect(
      getByTestId('totalBenefit').textContent.replace(nbspRegex, ' '),
    ).toContain('96 USD');
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

    const { container, getByTestId, queryByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual(
      'Claim settled as per contract.',
    );
    expect(getByTestId('created').textContent).toEqual('2014-08-16');
    expect(getByTestId('insurer').textContent).toEqual('Organization/3');
    expect(getByTestId('provider').textContent).toEqual('Practitioner/1');
    expect(getByTestId('totalSum').textContent).toContain('135.57');
    expect(getByTestId('purpose').textContent).toEqual('claim');
    expect(getByTestId('patient').textContent).toEqual('Patient/pat1');
    expect(getByTestId('insurance').textContent).toEqual('Coverage/9876B1');

    expect(queryByTestId('hasServices')).not.toBeNull();
    const tablesContent = [];
    getByTestId('hasServices')
      .querySelectorAll('.fhir-ui__TableRow')
      .forEach(el => {
        const tds = [];
        el.querySelectorAll('.fhir-ui__TableCell').forEach(item => {
          tds.push(String(item.textContent).trim());
        });
        tablesContent.push(tds);
      });
    // table header
    expect(tablesContent[0]).toEqual([
      'Service',
      'Service date',
      'Quantity',
      'Item cost',
    ]);

    // table 1st row
    expect(tablesContent[1]).toEqual([
      '(1205)',
      '2014-08-16',
      '-',
      `135.57${String.fromCharCode(160)}USD`,
    ]);
    // table 2nd row
    expect(tablesContent[2]).toEqual([
      '(group)',
      '2014-08-16',
      '-',
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

    const { container, getByTestId, queryByTestId, queryAllByTestId } = render(
      <ExplanationOfBenefit {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('created').textContent).toEqual('2017-01-05');
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
      'From: 2017-01-05; To: 2018-01-05',
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
    expect(getByTestId('supportingInfo.category').textContent).toContain(
      'clmrecvddate',
    );
    expect(getByTestId('supportingInfo.timingDate').textContent).toEqual(
      '2017-01-05',
    );

    const tablesContent = [];
    getByTestId('hasServices')
      .querySelectorAll('.fhir-ui__TableRow')
      .forEach(el => {
        const tds = [];
        el.querySelectorAll('.fhir-ui__TableCell').forEach(item => {
          tds.push(String(item.textContent).trim());
        });
        tablesContent.push(tds);
      });
    // table header
    expect(tablesContent[0]).toEqual([
      'Service',
      'Service date',
      'Quantity',
      'Item cost',
    ]);

    // table 1st row
    expect(tablesContent[1][0]).toContain('(185345009)');

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
});
