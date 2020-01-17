import React from 'react';
import { render } from '@testing-library/react';
import AdverseEvent from './AdverseEvent';

import stu3Example1 from '../../../fixtures/stu3/resources/adverseEvent/example1.json';

describe('should render component correctly', () => {
  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
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
});
