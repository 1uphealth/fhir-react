import React from 'react';
import { render } from '@testing-library/react';
import ObservationGraph from './ObservationGraph';

describe('ObservationGraph component', () => {
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
  it('should render component correctly with proper props', () => {
    const { container, getByTestId } = render(
      <ObservationGraph {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('valuePoint').textContent).toContain('41 %');
    expect(getByTestId('rangeContent41%-53%').textContent).toContain(
      '41 % - 53 %',
    );
  });

  it('should return empty component without required props', () => {
    const defaultProps = {};
    const { container } = render(<ObservationGraph {...defaultProps} />);

    expect(container).not.toBeNull();
    expect(container.hasChildNodes()).toBeFalsy();
  });
  it('should render component correctly with small props and in range value', () => {
    defaultProps.small = true;
    const { container, getByTestId } = render(
      <ObservationGraph {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('valuePoint').textContent).toContain('in range');
    expect(getByTestId('rangeContent41%-53%').textContent).toContain('');
  });
  it('should render component correctly with small props and out of range value', () => {
    defaultProps.small = true;
    defaultProps.valueQuantity.value = 39;
    const { container, getByTestId } = render(
      <ObservationGraph {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('valuePoint').textContent).toContain('out of range');
    expect(getByTestId('rangeContent41%-53%').textContent).toContain('');
  });
});
