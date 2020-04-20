import React from 'react';
import { render } from '@testing-library/react';
import PatientSimple from './PatientSimple';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example1PatientR4 from '../../../fixtures/r4/resources/patient/example1.json';

describe('should render component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: examplePatient,
    };
    const { getByTestId } = render(<PatientSimple {...defaultProps} />);

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('Jason Argonaut (usual)');
    expect(getByTestId('patientGender').textContent).toEqual('♂');
    expect(getByTestId('patientBirthDate').textContent).toEqual('1985-08-01');
    expect(getByTestId('patientId').textContent).toEqual('f8fedcd9e6e5');
  });

  test('DSTU3', () => {
    const defaultProps = {
      fhirResource: examplePatientSTU3,
    };
    const { getByTestId } = render(<PatientSimple {...defaultProps} />);

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('John, X Doe (usual)');
    expect(getByTestId('patientGender').textContent).toEqual('♂');
    expect(getByTestId('patientBirthDate').textContent).toEqual('2014-06-01');
    expect(getByTestId('patientId').textContent).toEqual('dc793caf0d58');
  });

  test('R4', () => {
    const defaultProps = {
      fhirResource: example1PatientR4,
    };
    const { getByTestId } = render(<PatientSimple {...defaultProps} />);

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('Peter, James Chalmers (official)');
    expect(getByTestId('patientGender').textContent).toEqual('♂');
    expect(getByTestId('patientBirthDate').textContent).toEqual('1974-12-25');
    expect(getByTestId('patientId').textContent).toEqual('example');
  });
});
