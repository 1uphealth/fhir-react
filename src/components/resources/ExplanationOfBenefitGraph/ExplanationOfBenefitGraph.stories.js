import React from 'react';

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

export default {
  title: 'ExplanationOfBenefitGraph',
  component: ExplanationOfBenefitGraph,
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
    margin: {
      table: {
        disable: true,
      },
    },
    totalLabel: {
      table: {
        disable: true,
      },
    },
    height: {
      table: {
        disable: true,
      },
    },
    enableLinkLabels: {
      table: {
        disable: true,
      },
    },
    enableValueLabels: {
      table: {
        disable: true,
      },
    },
    pieChartProperties: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <ExplanationOfBenefitGraph {...args} />;

export const DefaultExplanationOfBenefitGraph = Template.bind({});
DefaultExplanationOfBenefitGraph.args = {
  data: CHART_DATA,
  margin: { top: 10, bottom: 10 },
};

export const ExplanationOfBenefitGraphWithCustomCenteredMetric = Template.bind(
  {},
);
ExplanationOfBenefitGraphWithCustomCenteredMetric.args = {
  data: CHART_DATA,
  totalLabel: 'Custom',
};

export const ExplanationOfBenefitGraphWithHeightAndMargin = Template.bind({});
ExplanationOfBenefitGraphWithHeightAndMargin.args = {
  data: CHART_DATA,
  margin: { top: 40, bottom: 40 },
  height: 250,
};

export const ExplanationOfBenefitGraphWithLabels = Template.bind({});
ExplanationOfBenefitGraphWithLabels.args = {
  data: CHART_DATA,
  margin: { top: 20, bottom: 20 },
  enableLinkLabels: true,
  enableValueLabels: true,
};

export const ExplanationOfBenefitGraphWithPieChartProperties = Template.bind(
  {},
);
ExplanationOfBenefitGraphWithPieChartProperties.args = {
  data: CHART_DATA,
  margin: { top: 20, bottom: 20 },
  enableLinkLabels: true,
  enableValueLabels: true,
  pieChartProperties: { startAngle: 90, cornerRadius: 15, borderWidth: 4 },
};
