import React from 'react';

import { Root } from '../../ui';
import { ResponsivePie } from '@nivo/pie';

const ExplanationOfBenefitGraph = props => {
  const { data, enableValueLabels, enableLinkLabels } = props;

  const getTotalAmount = () => {
    const total = data.reduce((n, { value }) => n + value, 0);
    return `$${Number(total).toFixed(2)}`;
  };

  const CenteredMetric = ({ centerX, centerY }) => {
    return (
      <text
        x={centerX}
        y={centerY + 20}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan className="fw-bold display-5">{getTotalAmount()}</tspan>
        <tspan x={centerX} dy={-50} className="display-6">
          Total
        </tspan>
      </text>
    );
  };

  return (
    <Root name="ExplanationOfBenefitGraph">
      <div style={{ height: 400 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          enableArcLabels={enableValueLabels || false}
          enableArcLinkLabels={enableLinkLabels || false}
          innerRadius={0.85}
          cornerRadius={3}
          activeOuterRadiusOffset={1}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          layers={['arcs', CenteredMetric]}
        />
      </div>
    </Root>
  );
};

export default ExplanationOfBenefitGraph;
