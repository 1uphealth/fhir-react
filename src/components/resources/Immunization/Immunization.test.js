import React from 'react';
import { render } from '@testing-library/react';

import fhirVersions from '../fhirResourceVersions';
import Immunization from './Immunization';
import dstu2Example from '../../../fixtures/dstu2/resources/immunization/example1.json';
import stu3Example from '../../../fixtures/stu3/resources/immunization/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/immunization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/immunization/example2.json';

describe('should render Immunization component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2015-02-15',
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
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2015-02-15',
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
    };

    const { container, getByTestId } = render(
      <Immunization {...defaultProps} />,
    );

    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Fluvax');

    expect(getByTestId('providedDate').textContent).toContain('1/10/2013');

    expect(getByTestId('lotNumber').textContent).toContain('AAJN11K');
    expect(getByTestId('lotNumberExpirationDate').textContent).toContain(
      '2015-02-15',
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
