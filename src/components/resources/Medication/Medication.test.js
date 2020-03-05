import React from 'react';
import { render } from '@testing-library/react';

import Medication from './Medication';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medication/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medication/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medication/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medication/example2.json';

describe('should render Medication component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(<Medication {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Amoxicillin Powder');
    expect(getByTestId('manufacturer').textContent).toContain(
      'http://www.a-smeds.com',
    );
    expect(getByTestId('product-form').textContent).toContain(
      'Powder for Suspension',
    );
    expect(getByTestId('product-ingredient').textContent).toContain(
      'Amoxicillin',
    );
    expect(getByTestId('package-container').textContent).toContain(
      'Bottle - unit',
    );
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(<Medication {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'Vancomycin Hydrochloride',
    );
    expect(getByTestId('manufacturer').textContent).toContain('#org4');
    expect(getByTestId('product-form').textContent).toContain(
      'Injection Solution',
    );
    expect(getByTestId('product-ingredient').textContent).toContain(
      'Vancomycin Hydrochloride',
    );
    expect(getByTestId('package-container').textContent).toContain('Vial');

    expect(getByTestId('product-images').textContent).toContain(
      'Vancomycin Image',
    );
  });

  it('should render Title info properly when codeCoding does not exists', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(<Medication {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Amoxicillin');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Medication {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Amoxicillin');
    expect(queryByTestId('manufacturer')).toBeNull();
    expect(queryByTestId('product-form')).toBeNull();
    expect(queryByTestId('product-ingredient')).toBeNull();
    expect(queryByTestId('package-container')).toBeNull();
    expect(queryByTestId('product-images')).toBeNull();
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Medication {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'Capecitabine 500mg oral tablet',
    );
    expect(getByTestId('manufacturer').textContent).toEqual('#org2');
    expect(getByTestId('product-form').textContent).toContain(
      'Tablet dose form',
    );
    expect(queryByTestId('package-container')).toBeNull();
    expect(queryByTestId('product-images')).toBeNull();
    expect(getByTestId('product-ingredient').textContent).toContain('#sub04');
  });
});
