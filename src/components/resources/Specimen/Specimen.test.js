import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Specimen from './Specimen';

import exampleSpecimenR4 from '../../../fixtures/r4/resources/specimen/example1.json';
import fhirVersions from '../fhirResourceVersions';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
    };

    const { getByAltText } = render(<Specimen {...defaultProps} />);
    const headerIcon = getByAltText('specimen');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Specimen {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: (
        <img
          src={require('../../../assets/containers/Specimen/specimen.svg')}
          alt="specimen"
        />
      ),
    };

    const { getByAltText } = render(<Specimen {...defaultProps} />);
    const headerIcon = getByAltText('specimen');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Specimen {...defaultProps} />);
    const headerIcon = getByAltText('specimen');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Specimen {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId } = render(<Specimen {...defaultProps} />);

    expect(getByTestId('specimenTitle').textContent).toContain(
      'Specimen example',
    );
    expect(getByTestId('status').textContent).toContain('available');
    expect(getByTestId('specimenType')).toBeTruthy();
    expect(getByTestId('specimenSubject')).toBeTruthy();
    expect(getByTestId('specimenCollection')).toBeTruthy();
    expect(getByTestId('specimenReceivedTime')).toBeTruthy();
    expect(getByTestId('specimenNote')).toBeTruthy();
  });

  it('should render with minimal data', () => {
    const defaultProps = {
      fhirResource: {
        resourceType: 'Specimen',
        id: 'example',
        status: 'available',
      },
      fhirVersion: fhirVersions.R4,
    };

    const { getByTestId, queryByTestId } = render(
      <Specimen {...defaultProps} />,
    );

    expect(getByTestId('specimenTitle').textContent).toContain(
      'Specimen example',
    );
    expect(getByTestId('status').textContent).toContain('available');
    expect(queryByTestId('specimenType')).toBeNull();
    expect(queryByTestId('specimenSubject')).toBeNull();
    expect(queryByTestId('specimenCollection')).toBeNull();
    expect(queryByTestId('specimenReceivedTime')).toBeNull();
    expect(queryByTestId('specimenNote')).toBeNull();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Specimen {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: exampleSpecimenR4,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <Specimen {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
