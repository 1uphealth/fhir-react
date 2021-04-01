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
    const { getByTestId, getByText, queryByTestId, getAllByText } = render(
      <Bundle {...defaultProps} />,
    );

    expect(getAllByText('Patient').length).toBe(2);
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
    const { getByText, getAllByTestId } = render(<Bundle {...defaultProps} />);
    expect(getAllByTestId('title').map(title => title.textContent)).toEqual([
      'batch-response',
      'searchset',
      'Burn of ear',
      'Asthma',
      'Family history of cancer of colon',
      'Ischemic stroke (disorder)',
      'searchset',
      'searchset',
    ]);
    expect(getAllByTestId('total')[0].textContent).toEqual('4');
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
