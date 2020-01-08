import React from 'react';
import { render } from '@testing-library/react';

import Organization from './Organization';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

import stu3Example1 from '../../../fixtures/stu3/resources/organization/example1.json';

describe('should render Organization component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(
      <Organization {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('name').textContent).toContain('Burgers University');
    expect(getByTestId('address').textContent).toContain('91Den Burg');
    expect(getByTestId('contact').textContent).toContain('022-655 2300');
  });

  it('should render with DSTU2 source data in which address key does not exist', () => {
    const defaultProps = {
      fhirResource: dstu2Example2,
    };

    const { getByTestId, queryAllByTestId } = render(
      <Organization {...defaultProps} />,
    );

    expect(getByTestId('name').textContent).toContain('Clinical Lab');
    expect(queryAllByTestId('address').length).toEqual(0);
  });

  it('should render with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
    };

    const { getByTestId } = render(<Organization {...defaultProps} />);

    expect(getByTestId('name').textContent).toContain('Health Level');
    expect(getByTestId('address').textContent).toContain('Washtenaw Avenue');
    expect(getByTestId('contact').textContent).toContain('734-677-7777');
  });
});
