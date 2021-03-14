import React from 'react';
import { render } from '@testing-library/react';
import Bundle from './Bundle';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/bundle/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/bundle/example3.json';
import stu3Example1 from '../../../fixtures/stu3/resources/bundle/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/bundle/example1.json';

describe('Bundle should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };
    const { getByTestId, getByText, queryByTestId } = render(
      <Bundle {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('transaction');
    expect(queryByTestId('total')).toBeNull();
    expect(getByText('Claudio955 Ramón841')).toBeDefined();
    expect(getByText('Mayte822 Venegas795')).toBeDefined();
  });

  it('should render component correctly with DSTU2 source data, example 2', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example2,
    };
    const { getByTestId, getByText, getAllByTestId } = render(
      <Bundle {...defaultProps} />,
    );
    expect(getAllByTestId('title').map(title => title.textContent)).toEqual([
      'batch-response',
      'Bundle/2c2fb771-6c4b-4df8-89b2-47a1178e7c',
      'Bundle/86846953-60dd-47ba-b37a-7e7d7e3312',
      'Bundle/4bafe9c4-ba53-4d7b-89d0-d92ee0859a',
    ]);
    expect(getByTestId('total').textContent).toEqual('4');
    expect(getByText('Peter, James Chalmers')).toBeDefined();
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };
    const { getByTestId, getByText, queryByTestId } = render(
      <Bundle {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('transaction');
    expect(queryByTestId('total')).toBeNull();
    expect(getByText('Claudio955 Ramón841')).toBeDefined();
    expect(getByText('Mayte822 Venegas795')).toBeDefined();
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example1,
    };
    const { getByTestId, getByText, queryByTestId } = render(
      <Bundle {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('transaction');
    expect(queryByTestId('total')).toBeNull();
    expect(getByText('Claudio955 Ramón841')).toBeDefined();
    expect(getByText('Mayte822 Venegas795')).toBeDefined();
  });
});
