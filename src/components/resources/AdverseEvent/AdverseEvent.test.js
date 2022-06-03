import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AdverseEvent from './AdverseEvent';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/adverseEvent/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };

    const { getByAltText } = render(<AdverseEvent {...defaultProps} />);
    const headerIcon = getByAltText('adverse event');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<AdverseEvent {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/AdverseEvent/adverse-event.svg')}
          alt="adverse event"
        />
      ),
    };

    const { getByAltText } = render(<AdverseEvent {...defaultProps} />);
    const headerIcon = getByAltText('adverse event');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<AdverseEvent {...defaultProps} />);
    const headerIcon = getByAltText('adverse event');

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

    const { getByAltText } = render(<AdverseEvent {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<AdverseEvent {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Patient');

    expect(getByTestId('date').textContent).toEqual('01/29/2017');

    expect(getByTestId('event').textContent).toContain('304386008');

    expect(getByTestId('description').textContent).toContain(
      'This was a mild rash',
    );

    expect(getByTestId('hasSeriousness').textContent).toContain('Mild');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<AdverseEvent {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Patient');

    expect(getByTestId('date').textContent).toEqual('01/29/2017');

    expect(getByTestId('hasSeriousness').textContent).toContain('Non-serious');

    expect(getByTestId('event').textContent).toContain('304386008');

    expect(getByTestId('actuality').textContent).toEqual('actual');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <AdverseEvent {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(
      <AdverseEvent {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
