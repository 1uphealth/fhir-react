import React from 'react';
import { render } from '@testing-library/react';
import ExplanationOfBenefitGraph from './ExplanationOfBenefitGraph';

const CHART_DATA = [
  {
    id: 'a',
    label: 'a',
    value: 35,
    color: '#3498DB',
  },
  {
    id: 'b',
    label: 'b',
    value: 200,
    color: '#17A589',
  },
  {
    id: 'c',
    label: 'c',
    value: 76,
    color: '#D4AC0D',
  },
  {
    id: 'd',
    label: 'd',
    value: 76,
    color: '#EDBB99',
  },
];

describe('should render ExplanationOfBenefitGraph properly', () => {
  it('should render with ExplanationOfBenefitGraph data', () => {
    const defaultProps = {
      data: CHART_DATA,
      totalLabel: 'Custom',
    };

    const { container, getByTestId } = render(
      <ExplanationOfBenefitGraph {...defaultProps} />,
    );
    expect(container).not.toBeNull();

    expect(getByTestId('responsivePie')).not.toBeNull();
    expect(getByTestId('metricText').textContent).toContain('Custom');
    const totalValue = CHART_DATA.reduce((n, { value }) => n + value, 0);
    expect(getByTestId('metricAmount').textContent).toContain(
      `$${Number(totalValue).toFixed(2)}`,
    );
  });
});
