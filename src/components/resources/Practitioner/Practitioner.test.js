import React from 'react';
import { render } from '@testing-library/react';
import Practitioner from './Practitioner';
import fhirResourceTypes from '../fhirResourceTypes';

import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';

describe('Practitioner should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirVersion: fhirResourceTypes.DSTU2,
      fhirResource: dstu2Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Physician Family Medicine  (usual)',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: fhirResourceTypes.STU3,
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Sameer Sharma M.D. (official)',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
    expect(getByTestId('address').textContent).toContain('5815 S Calumet');
    expect(getByTestId('telecom').textContent).toContain(
      '31255200103125236837',
    );
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
