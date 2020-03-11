import React from 'react';
import { render } from '@testing-library/react';
import Procedure from './Procedure';

import dstu2Example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';

import r4Example2 from '../../../fixtures/r4/resources/procedure/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/procedure/example3.json';

describe('Procedure should render component correctly', () => {
  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual('EYE EXAM');
    expect(getByTestId('hasCoding').textContent).toContain('40707');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Appendectomy (Procedure)',
    );
    expect(getByTestId('hasCoding').textContent).toContain('80146002');
  });

  it('should render component that contain extra fields based of STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'Generalized abdominal',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Routine Appendectomy',
    );
  });

  it('should render component correctly with R4 source data - example 1', () => {
    const defaultProps = {
      fhirResource: r4Example2,
    };
    const { getByTestId, queryByTestId } = render(
      <Procedure {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual(
      'Insertion of intracardiac pacemaker (procedure)',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('performedDateTime').textContent).toEqual(
      'on 2015-04-05',
    );
    expect(getByTestId('hasCoding').textContent).toContain(
      'Insertion of intracardiac',
    );
    expect(queryByTestId('category')).toBeNull();
    expect(queryByTestId('location')).toBeNull();

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'Bradycardia',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Routine Appendectomy',
    );
  });

  it('should render component correctly with STU3 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example3,
    };
    const { getByTestId, queryByTestId } = render(
      <Procedure {...defaultProps} />,
    );
    expect(getByTestId('title').textContent).toEqual('Chemotherapy');
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(queryByTestId('performedDateTime')).toBeNull();
    expect(getByTestId('hasCoding').textContent).toContain('Chemotherapy');
    expect(queryByTestId('category')).toBeNull();
    expect(queryByTestId('location')).toBeNull();

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'DiagnosticReport/f201',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Eerste neo-adjuvante',
    );
  });
});
