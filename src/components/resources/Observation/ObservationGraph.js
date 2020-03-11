import React from 'react';
import _get from 'lodash/get';
import _isNumber from 'lodash/isNumber';
import './ObservationGraph.css';

const ObservationGraph = props => {
  if (props.referenceRange && _isNumber(_get(props, 'valueQuantity.value'))) {
    const tooLow = _get(props, 'referenceRange[0].low.value');
    const tooHigh = _get(props, 'referenceRange[0].high.value');
    if (!tooLow || !tooHigh) return null;

    const actual = props.valueQuantity.value;
    const maxNum = Math.max(tooHigh, actual);
    const minNum = Math.min(tooLow, actual);
    const startAt = (maxNum - minNum) * -0.5 + minNum;
    const endAt = (maxNum - minNum) * 0.5 + maxNum;
    const zeroShift = 0 - startAt;
    const lowBar = Math.round(((zeroShift + tooLow) / endAt) * 100);
    const rangeBar = Math.round(((zeroShift + tooHigh) / endAt) * 100) - lowBar;
    const valueBar = Math.round(((zeroShift + actual) / endAt) * 100) + 3;
    const higherBar = 100 - rangeBar - lowBar;

    return (
      <div className="fhir-resource__ObservationGraph">
        <div
          className="fhir-resource__ObservationGraph__value-wrapper"
          style={{ left: `${valueBar}%` }}
        >
          <code className="fhir-resource__ObservationGraph__value-actual">
            {actual}
          </code>
          &nbsp;
          <span className="fhir-resource__ObservationGraph__value-unit">
            {props.valueQuantity.unit}
          </span>
        </div>
        <div className="fhir-resource__ObservationGraph__progress">
          <div
            className="fhir-resource__ObservationGraph__progress-bar--outside-range"
            style={{ width: `${lowBar}%` }}
          >
            <small>
              <strong data-testid="tooLow">{`< ${tooLow}`}</strong>
            </small>
          </div>
          <div
            className="fhir-resource__ObservationGraph__progress-bar--inside-range"
            role="progressbar"
            style={{ width: `${rangeBar}%` }}
            aria-valuenow={actual}
            aria-valuemin={tooLow}
            aria-valuemax={tooHigh}
          ></div>
          <div
            className="fhir-resource__ObservationGraph__progress-value"
            style={{ left: `${valueBar}%` }}
          ></div>
          <div
            className="fhir-resource__ObservationGraph__progress-bar--outside-range"
            style={{ width: `${higherBar}%` }}
          >
            <small>
              <strong data-testid="tooHigh">{`> ${tooHigh}`}</strong>
            </small>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ObservationGraph;
