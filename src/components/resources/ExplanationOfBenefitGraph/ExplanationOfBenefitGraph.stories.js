import React from 'react';

import ExplanationOfBenefitGraph from './ExplanationOfBenefitGraph';

export default { title: 'ExplanationOfBenefitGraph' };

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

export const DefaultExplanationOfBenefitGraph = () => {
  return (
    <ExplanationOfBenefitGraph
      data={CHART_DATA}
      margin={{ top: 10, bottom: 10 }}
    />
  );
};

export const ExplanationOfBenefitGraphWithCustomCenteredMetric = () => {
  return <ExplanationOfBenefitGraph data={CHART_DATA} totalLabel="Custom" />;
};

export const ExplanationOfBenefitGraphWithHeightAndMargin = () => {
  return (
    <ExplanationOfBenefitGraph
      data={CHART_DATA}
      margin={{ top: 40, bottom: 40 }}
      height={250}
    />
  );
};

export const ExplanationOfBenefitGraphWithLabels = () => {
  return (
    <ExplanationOfBenefitGraph
      data={CHART_DATA}
      margin={{ top: 20, bottom: 20 }}
      enableLinkLabels
      enableValueLabels
    />
  );
};

export const ExplanationOfBenefitGraphWithPieChartProperties = () => {
  return (
    <ExplanationOfBenefitGraph
      data={CHART_DATA}
      margin={{ top: 20, bottom: 20 }}
      enableLinkLabels
      enableValueLabels
      pieChartProperties={{ startAngle: 90, cornerRadius: 15, borderWidth: 4 }}
    />
  );
};
