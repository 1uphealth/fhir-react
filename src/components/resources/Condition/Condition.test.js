import React from 'react';
import { render } from '@testing-library/react';
import Condition from './Condition';

import exampleCondition from '../../../fixtures/dstu2/resources/condition/example.json';
import exampleConditionSeverity from '../../../fixtures/dstu2/resources/condition/example-severity.json';

describe('should render component correctly', () => {
  it('DSTU2 - without severity field', () => {
    const defaultProps = {
      fhirResource: exampleCondition,
    };
    const { container } = render(<Condition {...defaultProps} />);

    expect(container).not.toBeNull();
  });

  test('DSTU2 - with severity field', () => {
    const defaultProps = {
      fhirResource: exampleConditionSeverity,
    };
    const { container } = render(<Condition {...defaultProps} />);

    expect(container).not.toBeNull();
  });
});
