import React from 'react';
import { render } from '@testing-library/react';

import Goal from './Goal';
import fhirVersions from '../fhirResourceVersions';
import dstu2Example1 from '../../../fixtures/dstu2/resources/goal/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/goal/example1.json';

describe('should render Goal component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { container, getByTestId } = render(<Goal {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('pet dander from');

    expect(getByTestId('status').textContent).toContain('in-progress');

    expect(getByTestId('description').textContent).toContain(
      ' the need for your rescue',
    );

    expect(getByTestId('category').textContent).toContain('Contingency');

    expect(getByTestId('addresses').textContent).toContain('Asthma');

    expect(getByTestId('author').textContent).toContain('MOORE, NICK');
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirVersion: fhirVersions.STU3,
    };

    const { container, getByTestId } = render(<Goal {...defaultProps} />);
    expect(container).not.toBeNull();

    expect(getByTestId('title').textContent).toContain('wants to defer weight');

    expect(getByTestId('status').textContent).toContain('on-hold');

    expect(getByTestId('description').textContent).toContain('weight is 160');

    expect(getByTestId('addresses').textContent).toContain('obesity condition');
  });
});
