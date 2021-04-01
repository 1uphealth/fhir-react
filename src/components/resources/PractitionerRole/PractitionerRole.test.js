import React from 'react';
import { render } from '@testing-library/react';
import PractitionerRole from './PractitionerRole';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/practitionerRole/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/practitionerRole/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/practitionerRole/example3.json';

describe('PractitionerRole should render component correctly', () => {
  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.STU3,
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Dr Adam Careful',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization/f001',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General medical practice',
    );
    expect(getByTestId('roles').textContent).toContain('(RP)');
  });

  it('should render component correctly with R4 source data', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example1,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Practitioner?identifier=http://hl7.org/fhir/sid/us-npi|893869400546',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization?identifier=http://hl7.org/fhir/sid/us-npi|846309199264',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General Practice',
    );
    expect(getByTestId('roles').textContent).toContain('General Practice');
  });

  it('should render component correctly with R4 source data - example2', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.R4,
      fhirResource: r4Example2,
    };
    const { getByTestId } = render(<PractitionerRole {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Practitioner roles and specialties',
    );
    expect(getByTestId('practitioner').textContent).toContain(
      'Dr Adam Careful',
    );
    expect(getByTestId('organization').textContent).toContain(
      'Organization/f001',
    );
    expect(getByTestId('specialties').textContent).toContain(
      'General medical practice',
    );
    expect(getByTestId('roles').textContent).toContain('(RP)');
  });

  it('component without fhirVersion props', () => {
    const warn = console.warn;
    const error = console.error;
    jest.spyOn(console, 'warn').mockImplementation((...args) =>
      args[0].includes('Unrecognized the fhir version property type')
        ? null // Silence the warning in test output
        : warn(...args),
    );
    jest.spyOn(console, 'error').mockImplementation((...args) =>
      args[0].includes(
        'Failed prop type: The prop `fhirVersion` is marked as required',
      )
        ? null // Silence the prop type error in test output
        : error(...args),
    );
    const defaultProps = {
      fhirResource: stu3Example1,
    };
    const { getByText } = render(<PractitionerRole {...defaultProps} />);

    expect(getByText(/Unhandled data structure/i)).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith(
      'Unrecognized the fhir version property type.',
    );
    jest.restoreAllMocks();
  });
});
