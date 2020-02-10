import React from 'react';
import { render } from '@testing-library/react';
import EachParticipant from './EachParticipant';

describe('should render component correctly', () => {
  it('EachParticipant', () => {
    const defaultProps = {
      eachParticipant: {
        display: 'display-data',
        periodStart: 'periodStart-data',
        text: 'text-data',
      },
    };

    const { container, getByTestId, queryAllByTestId } = render(
      <table>
        <tbody>
          <EachParticipant {...defaultProps} />
        </tbody>
      </table>,
    );

    expect(container).not.toBeNull();
    expect(getByTestId('display').textContent).toContain('display-data');
    expect(getByTestId('text').textContent).toContain('text-data');
    expect(queryAllByTestId('reference').length).toEqual(0);
    expect(getByTestId('periodStart').textContent).toContain(
      'periodStart-data',
    );
  });

  it('EachParticipant with reference', () => {
    const defaultProps = {
      eachParticipant: {
        display: 'display-data',
        periodStart: 'periodStart-data',
        reference: {
          reference: 'Practitioner/example',
          display: 'Dr Adam Careful',
        },
      },
    };

    const { getByTestId } = render(
      <table>
        <tbody>
          <EachParticipant {...defaultProps} />
        </tbody>
      </table>,
    );

    expect(getByTestId('reference').textContent).toContain('Dr Adam Careful');
    expect(getByTestId('reference').textContent).not.toContain('-');
  });

  it('EachParticipant renders missing value', () => {
    const defaultProps = {
      eachParticipant: {
        display: 'display-data',
        periodStart: 'periodStart-data',
      },
    };

    const { getByTestId, queryAllByTestId } = render(
      <table>
        <tbody>
          <EachParticipant {...defaultProps} />
        </tbody>
      </table>,
    );

    expect(getByTestId('text').textContent).toEqual('-');
    expect(queryAllByTestId('reference').length).toEqual(0);
  });
});
