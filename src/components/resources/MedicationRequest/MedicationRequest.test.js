import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MedicationRequest from './MedicationRequest';

import stu3Example1 from '../../../fixtures/stu3/resources/medicationRequest/example1.json';
import stu3Example2 from '../../../fixtures/stu3/resources/medicationRequest/example2.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationRequest/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationRequest/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/medicationRequest/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render MedicationRequest component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { getByAltText } = render(<MedicationRequest {...defaultProps} />);
    const headerIcon = getByAltText('medication request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<MedicationRequest {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/MedicationOrder/medication-request.svg')}
          alt="medication request"
        />
      ),
    };

    const { getByAltText } = render(<MedicationRequest {...defaultProps} />);
    const headerIcon = getByAltText('medication request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<MedicationRequest {...defaultProps} />);
    const headerIcon = getByAltText('medication request');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<MedicationRequest {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('prescribed medication');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Essential hypertension',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take one tablet',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('03/01/2015');
    expect(getByTestId('intent').textContent).toEqual('order');
  });
  it('should render with STU3 source data in which medicationReference key does not exist', () => {
    const defaultProps = {
      fhirResource: stu3Example2,
    };

    const { getByTestId } = render(<MedicationRequest {...defaultProps} />);

    expect(getByTestId('medication').textContent).toContain('250mg capsule');
  });

  it('should render with R4 source data(example1)', () => {
    const defaultProps = {
      fhirResource: r4Example1,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('prescribed medication');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Essential hypertension',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take one tablet',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('03/01/2015');
    expect(getByTestId('intent').textContent).toEqual('order');
  });

  it('should render with R4 source data(example2)', () => {
    const defaultProps = {
      fhirResource: r4Example2,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0311');
    expect(queryByTestId('reasonCode')).toBeNull();
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      'Take 4 tablets daily',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('01/15/2015');
    expect(getByTestId('intent').textContent).toEqual('order');
  });

  it('should render with R4 source data(example3)', () => {
    const defaultProps = {
      fhirResource: r4Example3,
    };

    const { container, getByTestId } = render(
      <MedicationRequest {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('Myleran 2mg tablet');
    expect(getByTestId('reasonCode').textContent).toContain(
      'Chronic myeloid Leukemia',
    );
    expect(getByTestId('hasDosageInstruction').textContent).toContain(
      '6 mg PO daily for remission',
    );
    expect(getByTestId('requester').textContent).toContain('Patrick Pump');
    expect(getByTestId('created').textContent).toEqual('01/15/2015');
    expect(getByTestId('intent').textContent).toEqual('order');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = { fhirResource: r4Example3 };

    const onClick = jest.fn();
    const { getByRole } = render(
      <MedicationRequest {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = { fhirResource: r4Example3 };

    const onClick = 'test';
    const { getByRole } = render(
      <MedicationRequest {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
