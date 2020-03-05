import React from 'react';
import { render } from '@testing-library/react';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/location/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/location/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/location/example2.json';

describe('should render Location component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Location {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'South Wing, second floor',
    );

    expect(getByTestId('status').textContent).toContain('active');

    expect(getByTestId('description').textContent).toContain(
      'Second floor of the Old South Wing',
    );

    expect(getByTestId('address').textContent).toContain('Galapagosweg 91');

    expect(getByTestId('telecom').textContent).toContain('fax2329');

    expect(queryByTestId('type')).toBeNull();

    expect(getByTestId('mode').textContent).toContain('instance');

    expect(getByTestId('physicalType').textContent).toContain('Wing');

    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Location {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'South Wing, second floor',
    );

    expect(getByTestId('status').textContent).toContain('active');

    expect(getByTestId('description').textContent).toContain(
      'Second floor of the Old South Wing',
    );

    expect(getByTestId('address').textContent).toContain('Galapagosweg 91');

    expect(getByTestId('telecom').textContent).toContain('fax2329');

    expect(queryByTestId('type')).toBeNull();

    expect(getByTestId('mode').textContent).toContain('instance');

    expect(getByTestId('physicalType').textContent).toContain('Wing');

    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Location {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'South Wing, second floor',
    );

    expect(getByTestId('status').textContent).toContain('active');

    expect(getByTestId('description').textContent).toContain(
      'Second floor of the Old South Wing',
    );

    expect(getByTestId('address').textContent).toContain('Galapagosweg 91');

    expect(getByTestId('telecom').textContent).toContain('fax2329');

    expect(queryByTestId('type')).toBeNull();

    expect(getByTestId('mode').textContent).toContain('instance');

    expect(getByTestId('physicalType').textContent).toContain('Wing');

    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Location {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual('BUMC Ambulance');

    expect(getByTestId('status').textContent).toEqual('active');

    expect(getByTestId('description').textContent).toEqual(
      'Ambulance provided by Burgers University Medical Center',
    );

    expect(queryByTestId('address')).toBeNull();

    expect(getByTestId('telecom').textContent).toContain('2329');

    expect(getByTestId('type').textContent).toContain('Ambulance');

    expect(getByTestId('mode').textContent).toContain('kind');

    expect(getByTestId('physicalType').textContent).toContain('Vehicle');

    expect(getByTestId('managingOrganization').textContent).toEqual(
      'Organization/f001',
    );
  });
});
