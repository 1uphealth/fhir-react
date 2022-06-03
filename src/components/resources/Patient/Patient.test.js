import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example2PatientSTU3 from '../../../fixtures/stu3/resources/patient/example2.json';
import example1PatientR4 from '../../../fixtures/r4/resources/patient/example1.json';
import example3PatientR4 from '../../../fixtures/r4/resources/patient/example3.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: examplePatient,
    };

    const { getByAltText } = render(<Patient {...defaultProps} />);
    const headerIcon = getByAltText('patient');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: examplePatient,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Patient {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: examplePatient,
      fhirIcons: (
        <img
          src={require('../assets/containers/Patient/patient.svg')}
          alt="patient"
        />
      ),
    };

    const { getByAltText } = render(<Patient {...defaultProps} />);
    const headerIcon = getByAltText('patient');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: examplePatient,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Patient {...defaultProps} />);
    const headerIcon = getByAltText('patient');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: examplePatient,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Patient {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: examplePatient,
    };
    const { getByTestId, queryByTestId } = render(
      <Patient {...defaultProps} />,
    );

    expect(getByTestId('patientName').textContent.replace(/\s+/g, ' ')).toEqual(
      'Jason Argonaut (usual)',
    );
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('08/01/1985');
    expect(getByTestId('patientAddress').textContent).toEqual(
      '1979 Milky Way Dr.Verona, WI 53593 US',
    );
    expect(getByTestId('patientPhones').textContent).toEqual(
      '608-271-9000608-771-9000608-771-9000608-771-9000',
    );
    expect(getByTestId('activeStatus').textContent).toEqual('active');
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('STU3', () => {
    const defaultProps = {
      fhirResource: examplePatientSTU3,
    };
    const { getByTestId, queryByTestId } = render(
      <Patient {...defaultProps} />,
    );

    expect(getByTestId('patientName').textContent.replace(/\s+/g, ' ')).toEqual(
      'John, X Doe (usual)',
    );
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('06/01/2014');
    expect(getByTestId('patientAddress').textContent).toEqual(' 05 99999 ');
    expect(getByTestId('patientPhones').textContent).toEqual('-');
    expect(queryByTestId('activeStatus')).toBeNull();
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('STU3 resource which contains communication key data', () => {
    const defaultProps = {
      fhirResource: example2PatientSTU3,
    };
    const { getByTestId } = render(<Patient {...defaultProps} />);
    expect(getByTestId('communicationLanguage').textContent).toContain('en');
  });

  test('R4', () => {
    const defaultProps = {
      fhirResource: example1PatientR4,
    };
    const { getByTestId, queryByTestId } = render(
      <Patient {...defaultProps} />,
    );

    expect(getByTestId('patientName').textContent.replace(/\s+/g, ' ')).toEqual(
      'Peter, James Chalmers (official)',
    );
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('12/25/1974');
    expect(getByTestId('patientAddress').textContent).toContain(
      'PleasantVille, Vic 3999',
    );
    expect(getByTestId('patientPhones').textContent).toContain(
      '(03) 5555 6473',
    );
    expect(getByTestId('activeStatus').textContent).toEqual('active');
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('R4 resource which contains deceased date', () => {
    const defaultProps = {
      fhirResource: example3PatientR4,
    };
    const { getByTestId } = render(<Patient {...defaultProps} />);
    expect(getByTestId('deceasedInfo').textContent).toEqual('02/14/2015');
  });

  it('should fire custom onClick function', () => {
    const defaultProps = { fhirResource: example3PatientR4 };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Patient {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = { fhirResource: example3PatientR4 };

    const onClick = 'test';
    const { getByRole } = render(
      <Patient {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
