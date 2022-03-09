import React from 'react';
import { render } from '@testing-library/react';

import Location from './Location';

import dstu2Example1 from '../../../fixtures/dstu2/resources/location/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/location/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/location/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/location/example2.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render Location component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<Location {...defaultProps} />);
    const headerIcon = getByAltText('location');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Location {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Location/location.svg')}
          alt="location marker"
        />
      ),
    };

    const { getByAltText } = render(<Location {...defaultProps} />);
    const headerIcon = getByAltText('location marker');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Location {...defaultProps} />);
    const headerIcon = getByAltText('location marker');

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

    const { getByAltText } = render(<Location {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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

    expect(getByTestId('telecom').textContent).toContain('2329');

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

    expect(getByTestId('telecom').textContent).toContain('2329');

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

    expect(getByTestId('telecom').textContent).toContain('2329');

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
