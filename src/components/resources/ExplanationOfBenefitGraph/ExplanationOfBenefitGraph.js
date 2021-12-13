import React from 'react';

import { Root } from '../../ui';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';

const ExplanationOfBenefitGraph = props => {
  const {
    data,
    totalLabel,
    height,
    margin,
    enableValueLabels,
    enableLinkLabels,
    pieChartProperties,
  } = props;

  const getTotalAmount = () => {
    const total = data.reduce((n, { value }) => n + value, 0);
    return `$${Number(total).toFixed(2)}`;
  };

  const getValidMargin = margin => {
    const resultMargin = {};
    if (margin) {
      if ('top' in margin) resultMargin.top = margin.top;
      if ('right' in margin) resultMargin.right = margin.right;
      if ('bottom' in margin) resultMargin.bottom = margin.bottom;
      if ('left' in margin) resultMargin.left = margin.left;
    }
    return resultMargin;
  };

  const CenteredMetric = () => (
    <div className="position-absolute d-flex flex-column w-100 translate-middle-y top-50">
      <h6 className="text-secondary" data-testid="metricText">
        {totalLabel || 'Total'}
      </h6>
      <h5 className="fw-bold text-dark" data-testid="metricAmount">
        {getTotalAmount()}
      </h5>
    </div>
  );

  return (
    <Root name="ExplanationOfBenefitGraph">
      {/* according to nivo library documentation, to keep Pie Chart svg aligned, 'height' prop has to be constant */}
      <div
        style={{ height: height || 200 }}
        className="position-relative text-center"
        data-testid="responsivePie"
      >
        <ResponsivePie
          data={data}
          margin={getValidMargin(margin)}
          colors={{ datum: 'data.color' }}
          enableArcLabels={enableValueLabels || false}
          enableArcLinkLabels={enableLinkLabels || false}
          innerRadius={0.88}
          activeOuterRadiusOffset={1}
          borderWidth={0.1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          {...pieChartProperties}
        />
        <CenteredMetric />
      </div>
    </Root>
  );
};

ExplanationOfBenefitGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  height: PropTypes.string,
  margin: PropTypes.shape({}),
  enableValueLabels: PropTypes.bool,
  enableLinkLabels: PropTypes.bool,
  totalLabel: PropTypes.string,
  pieChartProperties: PropTypes.shape({}),
};

export default ExplanationOfBenefitGraph;
