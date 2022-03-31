import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PractitionerRole from './PractitionerRole';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/practitionerRole/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/practitionerRole/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitionerRole/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('PractitionerRole should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };

    const { getByAltText } = render(<PractitionerRole {...defaultProps} />);
    const headerIcon = getByAltText('practitioner role');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/PractitionerRole/practitioner-role.svg')}
          alt="practitioner role"
        />
      ),
    };

    const { getByAltText } = render(<PractitionerRole {...defaultProps} />);
    const headerIcon = getByAltText('practitioner role');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<PractitionerRole {...defaultProps} />);
    const headerIcon = getByAltText('practitioner role');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<PractitionerRole {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Dr Adam Careful',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization/f001',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General medical practice',
    );
    expect(getByTestId('roles').textContent).toContain('(RP)');
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example1,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Practitioner?identifier=http://hl7.org/fhir/sid/us-npi|893869400546',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization?identifier=http://hl7.org/fhir/sid/us-npi|846309199264',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General Practice',
    );
    expect(getByTestId('roles').textContent).toContain('General Practice');
  });

  it('should render component correctly with R4 source data - example2', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example2,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Dr Adam Careful',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization/f001',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General medical practice',
    );
    expect(getByTestId('roles').textContent).toContain('(RP)');
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
    const { getByText } = render(<PractitionerRole {...defaultProps} />);

    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith(
      'Unrecognized the fhir version property type.',
    );
    jest.restoreAllMocks();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: stu3Example1,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <PractitionerRole {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: stu3Example1,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <PractitionerRole {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
