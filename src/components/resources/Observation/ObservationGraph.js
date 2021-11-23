import './ObservationGraph.css';

import React from 'react';
import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';

const OBSERVATION_VALUE = 'observationValue';

const rangeBaseClasses = `rounded-pill border border-1 border-light`;

const colorfulRange = ({
  width = 1,
  value = '',
  rangeClasses = `bg-primary ${rangeBaseClasses}`,
}) => {
  return {
    width: width,
    rangeClasses,
    value,
  };
};

const rangeContent = (width, rangeClasses, value, small) => (
  <div
    className={`${rangeClasses} text-white text-center font-source`}
    style={{ width: `${width}%`, lineHeight: '14px' }}
  >
    {value}
  </div>
);

const edgeRange = rangeContent(4, 'rounded-pill');

const observationValuePoint = (actualValue, unit) => {
  return (
    <div
      className={`bg-dark ${rangeBaseClasses} mx-1`}
      style={{ width: '15px' }}
    >
      <span className="position-absolute top-0 translate-middle ps-2 pb-5 fs-4 w-max-content">
        {`${actualValue} ${unit}`}
      </span>
    </div>
  );
};

const valueIsInRange = (actualValue, tooLow, tooHigh, rangeInOneRow, unit) => {
  const firstPart = { width: 1, value: '' };
  const thirdPart = { width: 1, value: '' };
  if (actualValue === tooLow) {
    thirdPart.width = 94;
    thirdPart.value = rangeInOneRow;
  } else if (actualValue === tooHigh) {
    firstPart.width = 94;
    firstPart.value = rangeInOneRow;
  } else {
    const actualRangeWidthLeft = Math.round(
      ((actualValue - tooLow) * 100) / (tooHigh - tooLow),
    );
    const actualRangeWidthRight = 95 - 1 - actualRangeWidthLeft;

    firstPart.width = actualRangeWidthLeft;
    firstPart.value = `<${tooLow} ${unit}`;
    thirdPart.width = actualRangeWidthRight;
    thirdPart.value = `>${tooHigh} ${unit}`;
  }

  return [
    colorfulRange(firstPart),
    OBSERVATION_VALUE,
    colorfulRange(thirdPart),
  ];
};

const valueIsOutOfRange = (actualValue, tooLow, tooHigh, rangeInOneRow) => {
  if (actualValue < tooLow) {
    const actualRangeWidth = Math.round(
      ((tooHigh - tooLow) * 100) / (tooHigh - actualValue),
    );
    return [
      OBSERVATION_VALUE,
      colorfulRange({
        width: 95 - actualRangeWidth,
        rangeClasses: 'rounded-pill',
      }),
      colorfulRange({ width: actualRangeWidth, value: rangeInOneRow }),
    ];
  } else {
    const actualRangeWidth = Math.round(
      ((tooHigh - tooLow) * 100) / (actualValue - tooLow),
    );
    return [
      colorfulRange({ width: actualRangeWidth, value: rangeInOneRow }),
      colorfulRange({
        width: 95 - actualRangeWidth,
        rangeClasses: 'rounded-pill',
      }),
      OBSERVATION_VALUE,
    ];
  }
};

const ObservationGraph = ({ referenceRange, valueQuantity }) => {
  if (referenceRange && _isNumber(_get(valueQuantity, 'value'))) {
    const tooLow = _get(referenceRange[0], 'low.value');
    const tooHigh = _get(referenceRange[0], 'high.value');

    const rangeInOneRow = `${tooLow} ${valueQuantity.unit} - ${tooHigh} ${valueQuantity.unit}`;

    if (!tooLow || !tooHigh) return null;

    const actualValue = valueQuantity.value;
    const graphRanges =
      actualValue >= tooLow && actualValue <= tooHigh
        ? valueIsInRange(
            actualValue,
            tooLow,
            tooHigh,
            rangeInOneRow,
            valueQuantity.unit,
          )
        : valueIsOutOfRange(actualValue, tooLow, tooHigh, rangeInOneRow);

    return (
      <div className="fhir-resource__ObservationGraph my-6">
        <div className="fhir-resource__ObservationGraph__progress">
          {edgeRange}
          {graphRanges.map(graphRange => {
            if (graphRange === OBSERVATION_VALUE)
              return observationValuePoint(actualValue, valueQuantity.unit);

            const { rangeClasses, width, value } = graphRange;
            return rangeContent(width, rangeClasses, value);
          })}
          {edgeRange}
        </div>
      </div>
    );
  }

  return null;
};

export default ObservationGraph;
