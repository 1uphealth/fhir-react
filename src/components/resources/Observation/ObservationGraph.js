import './ObservationGraph.css';

import React from 'react';
import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';

const ObservationGraph = props => {
  if (props.referenceRange && _isNumber(_get(props, 'valueQuantity.value'))) {
    const tooLow = _get(props, 'referenceRange[0].low.value');
    const tooHigh = _get(props, 'referenceRange[0].high.value');
    const edgeRange = { width: 4, color: 'rounded' };
    const observationValue = {
      width: 1,
      color: 'bg-dark rounded-circle border border-1 border-light',
    };
    const edgeCaseValue = {
      width: 1,
      color: 'bg-primary rounded border border-1 border-light',
    };
    const edgeCompletionValue = {
      width: 94,
      color: 'bg-primary rounded border border-1 border-light',
    };

    if (!tooLow || !tooHigh) return null;

    const actualValue = props.valueQuantity.value;
    let graphRanges = [];

    if (actualValue >= tooLow && actualValue <= tooHigh) {
      if (actualValue === tooLow) {
        graphRanges = [
          edgeRange,
          edgeCaseValue,
          observationValue,
          edgeCompletionValue,
          edgeRange,
        ];
      } else if (actualValue === tooHigh) {
        graphRanges = [
          edgeRange,
          edgeCompletionValue,
          observationValue,
          edgeCaseValue,
          edgeRange,
        ];
      } else {
        const actualRangeWidthLeft = Math.round(
          ((actualValue - tooLow) * 100) / (tooHigh - tooLow),
        );
        const actualRangeWidthRight = 95 - 1 - actualRangeWidthLeft;
        graphRanges = [
          edgeRange,
          {
            width: actualRangeWidthLeft,
            color: 'bg-primary rounded border border-1 border-light',
          },
          observationValue,
          {
            width: actualRangeWidthRight,
            color: 'bg-primary rounded border border-1 border-light',
          },
          edgeRange,
        ];
      }
    } else {
      if (actualValue < tooLow) {
        const actualRangeWidth = Math.round(
          ((tooHigh - tooLow) * 100) / (tooHigh - actualValue),
        );
        graphRanges = [
          edgeRange,
          observationValue,
          {
            width: 95 - actualRangeWidth,
            color: 'rounded',
          },
          {
            width: actualRangeWidth,
            color: 'bg-primary rounded border border-1 border-light',
          },
          edgeRange,
        ];
      } else {
        const actualRangeWidth = Math.round(
          ((tooHigh - tooLow) * 100) / (actualValue - tooLow),
        );
        graphRanges = [
          edgeRange,
          {
            width: actualRangeWidth,
            color: 'bg-primary rounded border border-1 border-light',
          },
          {
            width: 95 - actualRangeWidth,
            color: 'rounded',
          },
          observationValue,
          edgeRange,
        ];
      }
    }

    return (
      <div className="fhir-resource__ObservationGraph">
        <div className="fhir-resource__ObservationGraph__progress">
          {graphRanges.map(range => {
            if (range.color.includes('bg-dark')) {
              return (
                <div
                  className={`${range.color} mx-1`}
                  style={{ width: '15px' }}
                ></div>
              );
            }
            return (
              <div
                className={`${range.color}`}
                style={{ width: `${range.width}%` }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default ObservationGraph;
