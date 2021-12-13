import React from 'react';
import { render } from '@testing-library/react';
import Practitioner from './Practitioner';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';
import r4Example1 from '../../../fixtures/r4/resources/practitioner/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitioner/example3.json';

describe('Practitioner should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Physician Family Medicine',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Sameer Sharma M.D.',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
    expect(getByTestId('address').textContent).toContain('5815 S Calumet');
    expect(getByTestId('telecom').textContent).toContain(
      'fax3125520010phone3125236837',
    );
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example1,
    };
    const { getByTestId, queryByTestId } = render(
      <Practitioner {...defaultProps} />,
    );

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Adam Careful',
    );
    expect(queryByTestId('gender')).toBeNull();
    expect(getByTestId('address').textContent).toContain('534 Erewhon');
    expect(queryByTestId('telecom')).toBeNull();
  });

  it('should render component correctly with R4 source data - example2', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example2,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Pieter Voigt MD',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
    expect(getByTestId('address').textContent).toContain('Galapagosweg 91');
    expect(getByTestId('telecom').textContent).toContain('phone0205569336');
    expect(getByTestId('birthDate').textContent).toContain('4/29/1979');
  });

  it('component without fhirVersion props', () => {
    const warn = console.warn;
    const error = console.error;
    jest.spyOn(console, 'warn').mockImplementation((...args) =>
      args[0].includes('Unrecognized the fhir version property type')
        ? null // Silence the warning in test output
        : warn(...args),
    );
    jest.spyOn(console, 'error').mockImplementation((...args) =>
      args[0].includes(
        'Failed prop type: The prop `fhirVersion` is marked as required',
      )
        ? null // Silence the prop type error in test output
        : error(...args),
    );
    const defaultProps = {
      fhirResource: stu3Example1,
    };
    const { getByText } = render(<Practitioner {...defaultProps} />);

    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith(
      'Unrecognized the fhir version property type.',
    );
    jest.restoreAllMocks();
  });
});
