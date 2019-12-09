import React from 'react';
import { render } from '@testing-library/react';
import ObservationGraph from './ObservationGraph';

describe('ObservationGraph component', () => {
  it('should render component correctly with proper props', () => {
    const defaultProps = {
      referenceRange: [
        {
          low: {
            unit: '%',
            code: '%',
            system: 'http://unitsofmeasure.org',
            value: 41,
          },
          high: {
            unit: '%',
            code: '%',
            system: 'http://unitsofmeasure.org',
            value: 53,
          },
          text: '41 - 53 %',
        },
      ],
      valueQuantity: {
        unit: '%',
        code: '%',
        system: 'http://unitsofmeasure.org',
        value: 41,
      },
    };
    const { container, getByTestId } = render(
      <ObservationGraph {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('tooLow').textContent).toContain('41');
    expect(getByTestId('tooHigh').textContent).toContain('53');
  });

  it('should return empty component without required props', () => {
    const defaultProps = {};
    const { container } = render(<ObservationGraph {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(container.hasChildNodes()).toBeFalsy();
  });
});
