import React from 'react';
import { render } from '@testing-library/react';

import Medication from './Medication';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/medication/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medication/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medication/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medication/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medication/example2.json';
import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render Medication component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
    };

    const { getByAltText } = render(<Medication {...defaultProps} />);
    const headerIcon = getByAltText('medication');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Medication {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Medication/medication.svg')}
          alt="medication"
        />
      ),
    };

    const { getByAltText } = render(<Medication {...defaultProps} />);
    const headerIcon = getByAltText('medication');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Medication {...defaultProps} />);
    const headerIcon = getByAltText('medication');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Medication {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

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

    const { container, getByTestId, getByAltText } = render(
      <Medication {...defaultProps} />,
    );
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

    expect(getByAltText('Vancomycin Image').src).toContain(
      'https://www.drugs.com/images/pills/fio/AKN07410.JPG',
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
