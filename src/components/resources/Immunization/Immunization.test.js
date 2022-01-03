import Immunization from './Immunization';
import React from 'react';
import dstu2Example from '../../../fixtures/dstu2/resources/immunization/example1.json';
import fhirVersions from '../fhirResourceVersions';
import r4Example1 from '../../../fixtures/r4/resources/immunization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/immunization/example2.json';
import { render } from '@testing-library/react';
import stu3Example from '../../../fixtures/stu3/resources/immunization/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render Immunization component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example,
    };

    const { getByAltText } = render(<Immunization {...defaultProps} />);
    const headerIcon = getByAltText('immunization');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Immunization {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example,
      fhirIcons: (
        <img
          src={require('../assets/containers/Immunization/immunization.svg')}
          alt="immunization"
        />
      ),
    };

    const { getByAltText } = render(<Immunization {...defaultProps} />);
    const headerIcon = getByAltText('immunization');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Immunization {...defaultProps} />);
    const headerIcon = getByAltText('immunization');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Immunization {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2/15/2015',
    );

    expect(getByTestId('doseQuantity').textContent).toContain('5');

    expect(getByTestId('requester').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('performer').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('note').textContent).toContain(
      'Notes on adminstration of vaccine',
    );

    expect(getByTestId('route').textContent).toContain('intramuscular');

    expect(getByTestId('site').textContent).toContain('left arm');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example,
      fhirVersion: fhirVersions.STU3,
      fhirIcons: fhirIcons,
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2/15/2015',
    );

    expect(getByTestId('doseQuantity').textContent).toContain('5');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');

    expect(getByTestId('note').textContent).toContain(
      'Notes on adminstration of vaccine',
    );

    expect(getByTestId('route').textContent).toContain('intramuscular');

    expect(getByTestId('site').textContent).toContain('left arm');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2/15/2015',
    );

    expect(getByTestId('doseQuantity').textContent).toContain('5');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');

    expect(getByTestId('note').textContent).toContain(
      'Notes on adminstration of vaccine',
    );

    expect(getByTestId('route').textContent).toContain('intramuscular');

    expect(getByTestId('site').textContent).toContain('left arm');
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('DTP');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('patient').textContent).toEqual('Patient/example');

    expect(queryByTestId('lotNumber')).toBeNull();

    expect(queryByTestId('lotNumberExpirationDate')).toBeNull();

    expect(queryByTestId('doseQuantity')).toBeNull();

    expect(queryByTestId('note')).toBeNull();

    expect(queryByTestId('route')).toBeNull();

    expect(queryByTestId('site')).toBeNull();
  });
});
