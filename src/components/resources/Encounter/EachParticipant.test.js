import React from 'react';
import { render } from '@testing-library/react';
import EachParticipant from './EachParticipant';

describe('should render component correctly', () => {
  it('EachParticipant', () => {
    const defaultProps = {
      eachParticipant: {
        display: 'display-data',
        text: 'text-data',
        periodStart: 'periodStart-data',
      },
    };
    const { container, getByTestId } = render(
      <EachParticipant {...defaultProps} />,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('display').textContent).toContain('display-data');
    expect(getByTestId('text').textContent).toContain('text-data');
    expect(getByTestId('periodStart').textContent).toContain(
      'periodStart-data',
    );
  });
});
