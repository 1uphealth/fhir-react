import React from 'react';
import { render } from '@testing-library/react';
import Practitioner from './Practitioner';

import dstu2Example1 from '../../../fixtures/dstu2/resources/practitioner/example-1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/practitioner/example-1.json';

describe('Practitioner should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirVersion: 'dstu2',
      fhirResource: dstu2Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('name').textContent).trim()).toEqual(
      'Physician Family Medicine  (usual)',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: 'stu3',
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<Practitioner {...defaultProps} />);

    expect(String(getByTestId('name').textContent).trim()).toEqual(
      'Sameer Sharma M.D. (official)',
    );
    expect(getByTestId('gender').textContent).toEqual('male');
    expect(getByTestId('address').textContent).toContain('Address');
    expect(getByTestId('telecom').textContent).toContain('Telephone');
  });

  it('component without fhirVersion props', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };
    const { container, getByText } = render(<Practitioner {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
  });
});
