import React from 'react';
import { render } from '@testing-library/react';
import Money from '../../datatypes/Money';
import { nbspRegex } from '../../../testUtils';

describe('should render component correctly', () => {
  it('when rendering a dollar amount', () => {
    const defaultProps = {
      fhirData: {
        value: 12345.67,
        system: 'urn:iso:std:iso:4217',
        code: 'USD',
      },
    };
    const { container } = render(<Money {...defaultProps} />);

    expect(container.textContent.replace(nbspRegex, ' ')).toEqual(
      '12345.67 USD',
    );
  });

  test('when rendering a zero dollar amount', () => {
    const defaultProps = {
      fhirData: {
        value: 0.0,
        system: 'urn:iso:std:iso:4217',
        code: 'USD',
      },
    };
    const { container } = render(<Money {...defaultProps} />);

    expect(container.textContent.replace(nbspRegex, ' ')).toEqual('0 USD');
  });
});
