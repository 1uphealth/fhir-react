import React from 'react';
import { render } from '@testing-library/react';

import Organization from './Organization';
import fhirVersions from '../fhirResourceVersions';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/organization/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/organization/example2.json';

import r4Example1 from '../../../fixtures/r4/resources/organization/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/organization/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/organization/example3.json';

import fhirIcons from '../../../fixtures/example-icons';

describe('should render Organization component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<Organization {...defaultProps} />);
    const headerIcon = getByAltText('organization');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Organization/organization.svg')}
          alt="organization"
        />
      ),
    };

    const { getByAltText } = render(<Organization {...defaultProps} />);
    const headerIcon = getByAltText('organization');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Organization {...defaultProps} />);
    const headerIcon = getByAltText('organization');

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

    const { getByAltText } = render(<Organization {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <Organization {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Burgers University');
    expect(getByTestId('address').textContent).toContain('91Den Burg');
    expect(getByTestId('contact').textContent).toContain('022-655 2300');
    expect(getByTestId('type').textContent).toContain(
      'University Medical Hospital',
    );
    expect(getByTestId('type').textContent).toContain('Healthcare Provider');
  });

  it('should render with DSTU2 source data in which address key does not exist', () => {
    const defaultProps = {
      fhirResource: dstu2Example2,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByTestId, queryAllByTestId } = render(
      <Organization {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain('Clinical Lab');
    expect(queryAllByTestId('address').length).toEqual(0);
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Health Level');
    expect(getByTestId('address').textContent).toContain('Washtenaw Avenue');
    expect(getByTestId('contact').textContent).toContain('734-677-7777');
  });

  it('should render organization types with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
      fhirVersion: fhirVersions.STU3,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);

    expect(getByTestId('type').textContent).toContain(
      'Academic Medical Center',
    );
    expect(getByTestId('type').textContent).toContain(
      'University Medical Hospital',
    );
    expect(getByTestId('type').textContent).toContain('Healthcare Provider');
  });

  it('should render organization types with R4 source data - example 1', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId, queryByTestId } = render(
      <Organization {...defaultProps} />,
    );
    expect(getByTestId('title').textContent).toContain('Health Level');
    expect(getByTestId('address').textContent).toContain('Washtenaw Avenue');
    expect(getByTestId('contact').textContent).toContain('734-677-7777');
    expect(queryByTestId('type')).toBeNull();
  });

  it('should render organization types with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);
    expect(getByTestId('title').textContent).toContain(
      'Burgers University Medical Center',
    );
    expect(getByTestId('address').textContent).toContain(
      'Galapagosweg 91Den Burg',
    );
    expect(getByTestId('contact').textContent).toContain('022-655 2300');
    expect(getByTestId('type').textContent).toContain(
      'University Medical Hospital',
    );
    expect(getByTestId('type').textContent).toContain(
      'University Medical Hospital',
    );
    expect(getByTestId('type').textContent).toContain('Healthcare Provider');
  });

  it('should render organization component with information that "no additional data"', () => {
    const defaultProps = {
      fhirResource: r4Example3,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);
    expect(getByTestId('NotEnoughData').textContent).toContain(
      'No additional data',
    );
  });
});
