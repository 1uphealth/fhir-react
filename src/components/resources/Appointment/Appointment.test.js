import React from 'react';
import { render } from '@testing-library/react';
import Appointment from './Appointment';
import fhirVersions from '../fhirResourceVersions';

import exampleAppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example1.json';
import example2AppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example2.json';
import example1AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example1.json';
import example2AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example2.json';
import example3AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example3.json';
import example1AppointmentR4 from '../../../fixtures/r4/resources/appointment/example1.json';
import example2AppointmentR4 from '../../../fixtures/r4/resources/appointment/example2.json';
import example3AppointmentR4 from '../../../fixtures/r4/resources/appointment/example3.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleAppointmentDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'Discussion on the results',
    );
    expect(getByTestId('status').textContent).toEqual('booked');
    expect(getByTestId('startDate').textContent).toContain('2013-12-10');
    expect(getByTestId('type').textContent).toContain('General Discussion');
    expect(getByTestId('participant').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('participant').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('participant').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('participant').textContent).toContain(
      'South Wing, second floor',
    );
  });

  it('should render with DSTU2 source data which contains minutesDuration data ', () => {
    const defaultProps = {
      fhirResource: example2AppointmentDSTU2,
      fhirVersion: fhirVersions.DSTU2,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('minutesDuration').textContent).toEqual('15');
  });

  it('should render resource data which contains reason data ', () => {
    const defaultProps = {
      fhirResource: example2AppointmentSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('reason').textContent).toContain('Clinical Review');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: example1AppointmentSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId, queryByTestId } = render(
      <Appointment {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain(
      'Discussion on the results',
    );
    expect(getByTestId('status').textContent).toEqual('booked');
    expect(getByTestId('startDate').textContent).toContain('2013-12-10');

    expect(getByTestId('participant').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('participant').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('participant').textContent).toContain(
      'South Wing, second floor',
    );
    expect(getByTestId('type').textContent).toContain('Followup');
    expect(queryByTestId('serviceCategory')).toBeNull();
  });

  it('should display a few participants if exists in resource data', () => {
    const defaultProps = {
      fhirResource: example3AppointmentSTU3,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('participant').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('participant').textContent).toContain('Luigi Maas');
  });

  it('should render with R4 source data', () => {
    const defaultProps = {
      fhirResource: example1AppointmentR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId, queryByTestId } = render(
      <Appointment {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toContain(
      'Discussion on the results',
    );
    expect(getByTestId('status').textContent).toEqual('booked');
    expect(getByTestId('startDate').textContent).toContain('2013-12-10');

    expect(getByTestId('participant').textContent).toContain(
      'Peter James Chalmers',
    );
    expect(getByTestId('participant').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('participant').textContent).toContain(
      'South Wing, second floor',
    );
    expect(getByTestId('type').textContent).toContain(
      'A follow up visit from a previous appointment',
    );
    expect(getByTestId('comment').textContent).toContain(
      'Further expand on the results of the MRI',
    );
    expect(getByTestId('serviceCategory').textContent).toContain(
      'General Practice',
    );
    expect(queryByTestId('cancelationReason')).toBeNull();
  });

  it('should display a few participants if exists in resource data R4', () => {
    const defaultProps = {
      fhirResource: example2AppointmentR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('participant').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('participant').textContent).toContain('Luigi Maas');
  });

  it('should render with R4 source data which contains minutesDuration data ', () => {
    const defaultProps = {
      fhirResource: example3AppointmentR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('minutesDuration').textContent).toEqual('15');
  });

  it('should render resource data which contains reason data R4', () => {
    const defaultProps = {
      fhirResource: example3AppointmentR4,
      fhirVersion: fhirVersions.R4,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('reason').textContent).toContain('Clinical Review');
  });
});
