import React from 'react';
import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';

const OBSERVATION_VALUE = 'observationValue';
const IN_RANGE = 'in range';
const OUT_OF_RANGE = 'out of range';

const rangeBaseClasses = `border border-1 border-light`;

const colorfulRange = ({
  width = 1,
  value = '',
  rangeClasses = `bg-primary rounded-pill  ${rangeBaseClasses}`,
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
    style={{ width: `${width}%`, lineHeight: '14px', minWidth: '8px' }}
    key={`range${width}-${Math.random()}`}
    data-testid={`rangeContent${value && value.replace(/ /g, '')}`}
  >
    {!small && value}
  </div>
);

const edgeRange = () => rangeContent(2, 'rounded-pill');

const observationValuePoint = (actualValue, unit, small) => {
  return (
    <div
      className={`bg-dark ${rangeBaseClasses} rounded-circle ${
        small ? 'mx-0' : 'mx-1'
      }`}
      style={{ width: small ? '9px' : '17px' }}
      key={`ValuePoint-${Math.random()}`}
    >
      {!small && (
        <span
          className={`position-absolute top-0 translate-middle ps-2 ${
            small ? 'pb-4 fs-1' : 'pb-5 fs-4'
          } w-max-content`}
          data-testid="valuePoint"
        >
          {`${actualValue} ${unit}`}
        </span>
      )}
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

const ObservationGraph = ({ referenceRange, valueQuantity, small }) => {
  if (referenceRange && _isNumber(_get(valueQuantity, 'value'))) {
    const tooLow = _get(referenceRange[0], 'low.value');
    const tooHigh = _get(referenceRange[0], 'high.value');

    const rangeInOneRow = `${tooLow} ${valueQuantity.unit} - ${tooHigh} ${valueQuantity.unit}`;

    if (!tooLow || !tooHigh) return null;

    const actualValue = valueQuantity.value;
    const inRange = actualValue >= tooLow && actualValue <= tooHigh;
    const graphRanges = inRange
      ? valueIsInRange(
          actualValue,
          tooLow,
          tooHigh,
          rangeInOneRow,
          valueQuantity.unit,
        )
      : valueIsOutOfRange(actualValue, tooLow, tooHigh, rangeInOneRow);

    const smallRangeText = inRange ? IN_RANGE : OUT_OF_RANGE;

    return (
      <div
        className={`position-relative ${small ? 'w-100 w-sm-144  ' : 'my-6'}`}
      >
        {small && (
          <span
            className={`pb-1 fs-75 font-source d-inline-block`}
            data-testid="smallRangeText"
          >
            {smallRangeText}
          </span>
        )}
        <div
          className="d-flex overflow-hidden bg-gray-200 fs-75 rounded-pill"
          style={{ height: small ? '0.5rem' : '1rem' }}
        >
          {edgeRange()}
          {graphRanges.map(graphRange => {
            if (graphRange === OBSERVATION_VALUE)
              return observationValuePoint(
                actualValue,
                valueQuantity.unit,
                small,
                inRange,
              );

            const { rangeClasses, width, value } = graphRange;
            return rangeContent(width, rangeClasses, value, small);
          })}
          {edgeRange()}
        </div>
      </div>
    );
  }

  return null;
};

export default ObservationGraph;
