import React from 'react';
import { render } from '@testing-library/react';

import ExplanationOfBenefit from './ExplanationOfBenefit';
import { nbspRegex } from '../../../testUtils';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/explanationOfBenefit/example1.json';
import example1Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example1.json';
import example2Stu3 from '../../../fixtures/stu3/resources/explanationOfBenefit/example2.json';
import example1R4 from '../../../fixtures/r4/resources/explanationOfBenefit/personPrimaryCoverage.json';

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
});
