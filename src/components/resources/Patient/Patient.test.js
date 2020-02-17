import React from 'react';
import { render } from '@testing-library/react';
import Patient from './Patient';

import examplePatient from '../../../fixtures/dstu2/resources/patient/example.json';
import examplePatientSTU3 from '../../../fixtures/stu3/resources/patient/example.json';
import example2PatientSTU3 from '../../../fixtures/stu3/resources/patient/example2.json';
import example1PatientR4 from '../../../fixtures/r4/resources/patient/example1.json';
import example3PatientR4 from '../../../fixtures/r4/resources/patient/example3.json';

describe('should render component correctly', () => {
  it('DSTU2', () => {
    const defaultProps = {
      fhirResource: examplePatient,
    };
    const { getByTestId, queryByTestId } = render(
      <Patient {...defaultProps} />,
    );

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('Jason Argonaut (usual)');
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('1985-08-01');
    expect(getByTestId('patientAddress').textContent).toEqual(
      '1979 Milky Way Dr.Verona, WI 53593 US',
    );
    expect(getByTestId('patientPhones').textContent).toEqual(
      '608-271-9000608-771-9000608-771-9000608-771-9000',
    );
    expect(getByTestId('activeStatus').textContent).toEqual('active');
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('DSTU3', () => {
    const defaultProps = {
      fhirResource: examplePatientSTU3,
    };
    const { getByTestId, queryByTestId } = render(
      <Patient {...defaultProps} />,
    );

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('John, X Doe (usual)');
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('2014-06-01');
    expect(getByTestId('patientAddress').textContent).toEqual(' 05 99999 ');
    expect(getByTestId('patientPhones').textContent).toEqual('-');
    expect(queryByTestId('activeStatus')).toBeNull();
    expect(queryByTestId('deceasedInfo')).toBeNull();
  });

  test('DSTU3 resource which contains communication key data', () => {
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

    expect(
      getByTestId('patientName-0').textContent.replace(/\s+/g, ' '),
    ).toEqual('Peter, James Chalmers (official)');
    expect(getByTestId('patientGender').textContent).toEqual('male');
    expect(getByTestId('patientBirthDate').textContent).toEqual('1974-12-25');
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
    expect(getByTestId('deceasedInfo').textContent).toEqual('2015-02-14');
  });
});
