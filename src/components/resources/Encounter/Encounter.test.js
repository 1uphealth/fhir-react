import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Encounter from './Encounter';
import fhirVersions from '../fhirResourceVersions';
import example1 from '../../../fixtures/dstu2/resources/encounter/example.json';
import example2 from '../../../fixtures/dstu2/resources/encounter/example-2.json';
import example_STU3 from '../../../fixtures/stu3/resources/encounter/example-1.json';
import example2_STU3 from '../../../fixtures/stu3/resources/encounter/example-2.json';
import example1_R4 from '../../../fixtures/r4/resources/encounter/example1.json';
import example2_R4 from '../../../fixtures/r4/resources/encounter/example2.json';
import example3_R4 from '../../../fixtures/r4/resources/encounter/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
    };

    const { getByAltText } = render(<Encounter {...defaultProps} />);
    const headerIcon = getByAltText('encounter');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Encounter {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Encounter/encounter.svg')}
          alt="encounter"
        />
      ),
    };

    const { getByAltText } = render(<Encounter {...defaultProps} />);
    const headerIcon = getByAltText('encounter');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Encounter {...defaultProps} />);
    const headerIcon = getByAltText('encounter');

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

    const { getByAltText } = render(<Encounter {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('DSTU2 - with PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example1,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
  });

  it('DSTU2 - without PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: example2,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/Baseline West Medical/i)).toBeTruthy();
  });
  it('STU3 - with PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: example_STU3,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
  });

  it('STU3 - without PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: example2_STU3,
    };
    const { container, getByText } = render(<Encounter {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(getByText(/inpatient encounter/i)).toBeTruthy();
  });

  it('R4 - without PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example1_R4,
    };
    const { container, getByText, queryByText } = render(
      <Encounter {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByText(/inpatient encounter/i)).toBeTruthy();
    expect(queryByText(/PARTICIPANTS/i)).toBeNull();
  });

  it('R4 - with PARTICIPANTS table', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example2_R4,
    };
    const { container, getByText, getByTestId } = render(
      <Encounter {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toEqual("Client's home");
    expect(getByTestId('resourceClass').textContent).toEqual('home health');
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
    expect(getByText(/Dr Adam Careful/i)).toBeTruthy();
  });

  it('R4 - with PARTICIPANTS table and type', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: example3_R4,
    };
    const { container, getByText, getByTestId } = render(
      <Encounter {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('resourceClass').textContent).toEqual('ambulatory');
    expect(getByTestId('encounterType').textContent).toContain('Consultation');
    expect(getByText(/PARTICIPANTS/i)).toBeTruthy();
    expect(getByText(/Practitioner\/f201/i)).toBeTruthy();
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
      fhirResource: example2_STU3,
    };
    const { getByText } = render(<Encounter {...defaultProps} />);

    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith(
      'Unrecognized the fhir version property type.',
    );
    jest.restoreAllMocks();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2_STU3,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Encounter {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: example2_STU3,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <Encounter {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
