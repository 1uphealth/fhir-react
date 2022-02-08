import React from 'react';
import { render } from '@testing-library/react';
import MedicationStatement from './MedicationStatement';
import fhirVersions from '../fhirResourceVersions';
import example1MedicationStatement from '../../../fixtures/dstu2/resources/medicationStatement/example1.json';
import stu3Example from '../../../fixtures/stu3/resources/medicationStatement/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/medicationStatement/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render MedicationStatement component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<MedicationStatement {...defaultProps} />);
    const headerIcon = getByAltText('medication statement');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<MedicationStatement {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/MedicationStatement/medication-statement.svg')}
          alt="medication statement"
        />
      ),
    };

    const { getByAltText } = render(<MedicationStatement {...defaultProps} />);
    const headerIcon = getByAltText('medication statement');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<MedicationStatement {...defaultProps} />);
    const headerIcon = getByAltText('medication statement');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<MedicationStatement {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: example1MedicationStatement,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId, queryByTestId } = render(
      <MedicationStatement {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain(
      'amphetamine-dextroamphetamine',
    );
    expect(getByTestId('startDate').textContent).toContain('4/19/2016');
    expect(queryByTestId('medicationReference')).toBeNull();

    expect(getByTestId('dosageInstruction').textContent).toContain(
      'Take 1 capsule',
    );
  });

  it('with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, queryAllByTestId, queryByTestId } = render(
      <MedicationStatement {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Medication Statement');
    expect(queryAllByTestId('startDate')).toHaveLength(0);
    expect(queryAllByTestId('endDate')).toHaveLength(0);

    expect(getByTestId('dosageInstruction').textContent).toContain(
      '1-2 tablets once daily',
    );

    const ingredients = queryAllByTestId('ingredient-item').map(
      x => x.textContent,
    );
    expect(ingredients).toHaveLength(2);
    expect(ingredients).toEqual([
      'Acetaminophen 500 MG',
      'Diphenhydramine Hydrochloride 25 mg',
    ]);

    expect(getByTestId('dosageInstruction').textContent).toContain(
      '1-2 tablets once daily at bedtime as needed for restless legs',
    );

    expect(queryByTestId('medicationReference').textContent).toContain(
      '#med0309',
    );
    expect(getByTestId('hasNote').textContent).toContain('occasional');
    expect(getByTestId('hasReasonCode').textContent).toContain('Legs');
  });

  it('with R4 source data', () => {
    const defaultProps = {
      fhirResource: r4Example1,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryAllByTestId } = render(
      <MedicationStatement {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual('Medication Statement');
    expect(queryAllByTestId('startDate')).toHaveLength(0);
    expect(queryAllByTestId('endDate')).toHaveLength(0);

    expect(getByTestId('dosageInstruction').textContent).toContain(
      '1-2 tablets once daily',
    );

    const ingredients = queryAllByTestId('ingredient-item').map(
      x => x.textContent,
    );
    expect(ingredients).toHaveLength(2);
    expect(ingredients).toEqual([
      'Acetaminophen 500 MG',
      'Diphenhydramine Hydrochloride 25 mg',
    ]);

    expect(getByTestId('hasNote').textContent).toContain('occasional');
    expect(getByTestId('hasReasonCode').textContent).toContain('Legs');
    expect(getByTestId('medicationReference').textContent).toContain(
      '#med0309',
    );
  });
});
