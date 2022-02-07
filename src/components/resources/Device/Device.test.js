import React from 'react';
import { render } from '@testing-library/react';

import Device from './Device';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/device/example.json';
import stu3Example2 from '../../../fixtures/stu3/resources/device/example2.json';
import r4Example2 from '../../../fixtures/r4/resources/device/example2.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render Device component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<Device {...defaultProps} />);
    const headerIcon = getByAltText('device');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Device {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/Device/device.svg')}
          alt="device"
        />
      ),
    };

    const { getByAltText } = render(<Device {...defaultProps} />);
    const headerIcon = getByAltText('device');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Device {...defaultProps} />);
    const headerIcon = getByAltText('device');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Device {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(<Device {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('123');

    expect(getByTestId('expiry').textContent).toContain('expires');

    expect(getByTestId('typeCoding').textContent).toContain('Drain');

    expect(getByTestId('uniqueId').textContent).toEqual('-');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(<Device {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Octane');

    expect(getByTestId('expiry').textContent).toContain('expires');

    expect(getByTestId('typeCoding').textContent).toContain('Coated');

    expect(getByTestId('uniqueId').textContent).toEqual('FHIR® Hip System');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Device {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual('Device');

    expect(getByTestId('status').textContent).toEqual('active');

    expect(queryByTestId('expiry')).toBeNull();

    expect(queryByTestId('typeCoding')).toBeNull();

    expect(getByTestId('uniqueId').textContent).toEqual('-');
  });
});
