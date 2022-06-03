import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MedicationAdministration from './MedicationAdministration';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/medicationAdministration/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/medicationAdministration/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationAdministration/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/medicationAdministration/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render MedicationAdministration component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    const headerIcon = getByAltText('medication administration');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/MedicationAdministration/medication-administration.svg')}
          alt="pill gets swallowed"
        />
      ),
    };

    const { getByAltText } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    const headerIcon = getByAltText('pill gets swallowed');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    const headerIcon = getByAltText('pill gets swallowed');

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

    const { getByAltText } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain(
      'Medication/medicationex',
    );

    expect(getByTestId('patient').textContent).toContain('Patient/example');

    expect(getByTestId('practitioner').textContent).toContain(
      'Practitioner/example',
    );

    expect(getByTestId('periodTimeStart').textContent).toEqual('01/15/2015');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('01/15/2015');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('80 mg');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('#med0301');

    expect(getByTestId('patient').textContent).toContain('Donald Duck');

    expect(getByTestId('practitioner').textContent).toContain('Patrick Pump');

    expect(getByTestId('periodTimeStart').textContent).toEqual('01/15/2015');

    expect(getByTestId('periodTimeEnd').textContent).toEqual('-');

    expect(getByTestId('dosageRoute').textContent).toContain(
      'Intravenous route',
    );

    expect(getByTestId('dosageQuantity').textContent).toEqual('500 mg');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId, queryByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toContain('#med0303');
    expect(getByTestId('status').textContent).toContain('on-hold');
    expect(getByTestId('patient').textContent).toContain('Donald Duck');
    expect(queryByTestId('practitioner')).toBeNull();
    expect(getByTestId('periodTimeStart').textContent).toEqual('01/15/2015');
    expect(getByTestId('periodTimeEnd').textContent).toEqual('01/15/2015');
    expect(getByTestId('dosageRoute').textContent).toContain('-');
    expect(getByTestId('dosageQuantity').textContent).toEqual('-');
  });

  it('should render with R4 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const { container, getByTestId } = render(
      <MedicationAdministration {...defaultProps} />,
    );
    expect(container).not.toBeNull();
    expect(getByTestId('title').textContent).toContain('#med0306');
    expect(getByTestId('status').textContent).toContain('completed');
    expect(getByTestId('patient').textContent).toContain('Donald Duck');
    expect(getByTestId('practitioner').textContent).toContain('Patrick Pump');
    expect(getByTestId('periodTimeStart').textContent).toEqual('01/15/2015');
    expect(getByTestId('periodTimeEnd').textContent).toEqual('01/15/2015');
    expect(getByTestId('dosageRoute').textContent).toContain('Oral Route');
    expect(getByTestId('dosageQuantity').textContent).toEqual('2 TAB');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirVersion: fhirVersions.R4,
    };

    const onClick = jest.fn();
    const { getByRole } = render(
      <MedicationAdministration {...defaultProps} onClick={onClick} />,
    );
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
    const { getByRole } = render(
      <MedicationAdministration {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
