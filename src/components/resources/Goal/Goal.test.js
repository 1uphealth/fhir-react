import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Goal from './Goal';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/goal/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/goal/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/goal/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/goal/example2.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render Goal component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<Goal {...defaultProps} />);
    const headerIcon = getByAltText('goal');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Goal {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img src={require('../assets/containers/Goal/goal.svg')} alt="goal" />
      ),
    };

    const { getByAltText } = render(<Goal {...defaultProps} />);
    const headerIcon = getByAltText('goal');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Goal {...defaultProps} />);
    const headerIcon = getByAltText('goal');

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

    const { getByAltText } = render(<Goal {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(<Goal {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('pet dander from');

    expect(getByTestId('status').textContent).toContain('in-progress');

    expect(getByTestId('description').textContent).toContain(
      ' the need for your rescue',
    );

    expect(getByTestId('category').textContent).toContain('Contingency');

    expect(getByTestId('addresses').textContent).toContain('Asthma');

    expect(getByTestId('author').textContent).toContain('MOORE, NICK');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(<Goal {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('wants to defer weight');

    expect(getByTestId('status').textContent).toContain('on-hold');

    expect(getByTestId('description').textContent).toContain('weight is 160');

    expect(getByTestId('addresses').textContent).toContain('obesity condition');
  });

  it('should render with R4 source data - example 1', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Goal {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual('Goal');

    expect(getByTestId('status').textContent).toEqual('on-hold');

    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );

    expect(getByTestId('statusDate').textContent).toEqual('02/14/2016');

    expect(getByTestId('description').textContent).toEqual(
      'Target weight is 160 to 180 lbs.',
    );

    expect(getByTestId('addresses').textContent).toEqual('obesity condition');

    expect(getByTestId('category').textContent).toContain('(dietary)');

    expect(getByTestId('priority').textContent).toContain('High Priority');

    expect(queryByTestId('achievementStatus')).toBeNull();
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <Goal {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toEqual('Goal');

    expect(getByTestId('status').textContent).toEqual('completed');

    expect(getByTestId('headerStartDate').textContent).toEqual('04/05/2015');

    expect(getByTestId('subject').textContent).toContain(
      'Peter James Chalmers',
    );

    expect(getByTestId('description').textContent).toEqual('Stop smoking');

    expect(getByTestId('achievementStatus').textContent).toContain('Achieved');

    expect(queryByTestId('statusDate')).toBeNull();

    expect(queryByTestId('addresses')).toBeNull();

    expect(queryByTestId('category')).toBeNull();

    expect(queryByTestId('priority')).toBeNull();
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(<Goal {...defaultProps} onClick={onClick} />);
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = 'test';
    const { getByRole } = render(<Goal {...defaultProps} onClick={onClick} />);
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
