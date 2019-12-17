import React from 'react';
import { render } from '@testing-library/react';
import Procedure from './Procedure';

import dstu2Example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';

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
      'Reason procedure',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Additional information about ',
    );
  });
});
