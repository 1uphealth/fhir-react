import React from 'react';
import { render } from '@testing-library/react';

import Organization from './Organization';

import dstu2Example1 from '../../../fixtures/dstu2/resources/organization/example1.json';
import dstu2Example2 from '../../../fixtures/dstu2/resources/organization/example2.json';

describe('should render Gola component properly', () => {
  it('should render with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
    };

    const { container, getByTestId } = render(
      <Organization {...defaultProps} />,
    );
    expect(container).not.toBeNull();
  });
});
