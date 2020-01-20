import React from 'react';
import { render } from '@testing-library/react';
import Appointment from './Appointment';

import exampleAppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example1.json';
import example2AppointmentDSTU2 from '../../../fixtures/dstu2/resources/appointment/example2.json';
import example1AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example1.json';
import example2AppointmentSTU3 from '../../../fixtures/stu3/resources/appointment/example2.json';

describe('should render component correctly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: exampleAppointmentDSTU2,
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
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('minutesDuration').textContent).toEqual('15');
  });

  it('should render resource data which contains reason data ', () => {
    const defaultProps = {
      fhirResource: example2AppointmentSTU3,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('reason').textContent).toContain('Clinical Review');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: example1AppointmentSTU3,
    };
    const { getByTestId } = render(<Appointment {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain(
      'Discussion on the results',
    );
    expect(getByTestId('status').textContent).toEqual('booked');
    expect(getByTestId('startDate').textContent).toContain('2013-12-10');

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
});
