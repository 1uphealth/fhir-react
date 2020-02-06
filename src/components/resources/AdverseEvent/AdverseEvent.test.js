import React from 'react';
import { render } from '@testing-library/react';
import AdverseEvent from './AdverseEvent';
import fhirVersions from '../fhirResourceVersions';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';
import stu4Example1 from '../../../fixtures/stu4/resources/adverseEvent/example1.json';

describe('should render component correctly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };
    const { getByTestId } = render(<AdverseEvent {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Patient');

    expect(getByTestId('date').textContent).toEqual('2017-01-29');

    expect(getByTestId('type').textContent).toContain('304386008');

    expect(getByTestId('description').textContent).toContain(
      'This was a mild rash',
    );

    expect(getByTestId('hasSeriousness').textContent).toContain('Mild');
  });

  it('should render with STU4 source data', () => {
    const defaultProps = {
      fhirResource: stu4Example1,
      fhirVersion: fhirVersions.STU4,
    };
    const { getByTestId } = render(<AdverseEvent {...defaultProps} />);

    expect(getByTestId('title').textContent).toContain('Patient');

    expect(getByTestId('date').textContent).toEqual('2017-01-29');

    expect(getByTestId('hasSeriousness').textContent).toContain('Non-serious');

    expect(getByTestId('event').textContent).toContain('304386008');

    expect(getByTestId('actuality').textContent).toEqual('actual');
  });
});
