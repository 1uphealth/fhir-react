import React from 'react';
import { render } from '@testing-library/react';
import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';

describe('should render component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: examplePatient,
    };
    const { getByTestId } = render(<Patient {...defaultProps} />);

    expect(getByTestId('patientName').textContent.replace(/\s+/g, ' ')).toEqual(
      'Jason Argonaut (usual)',
    );
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('1985-08-01');
    expect(getByTestId('patientAddress').textContent).toEqual(
      '1979 Milky Way Dr.Verona, WI 53593 US',
    );
    expect(getByTestId('patientPhones').textContent).toEqual(
      '608-271-9000608-771-9000608-771-9000608-771-9000',
    );
  });

  test('DSTU3', () => {
    const defaultProps = {
      fhirResource: examplePatientSTU3,
    };
    const { getByTestId } = render(<Patient {...defaultProps} />);

    expect(getByTestId('patientName').textContent.replace(/\s+/g, ' ')).toEqual(
      'John,X Doe (usual)',
    );
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('2014-06-01');
    expect(getByTestId('patientAddress').textContent).toEqual(' 05 99999 ');
    expect(getByTestId('patientPhones').textContent).toEqual('');
  });
});
