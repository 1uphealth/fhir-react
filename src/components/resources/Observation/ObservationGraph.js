import React from 'react';
import _get from 'lodash/get';
import _isUndefined from 'lodash/isUndefined';

const ObservationGraph = props => {
  if (
    !_isUndefined(props.referenceRange) &&
    !_isUndefined(_get(props, 'valueQuantity.value'))
  ) {
    const tooLow = _get(props, 'referenceRange[0].low.value');
    const tooHigh = _get(props, 'referenceRange[0].high.value');
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
      <div className="col-md-6 mt-2 mb-2 pl-0 pr-0">
        <div
          style={{
            position: 'absolute',
            left: `${valueBar - Math.max(2.5, actual.toString().length * 2)}%`,
          }}
        >
          <code style={{ display: 'inline-block' }}>
            <h4>
              <strong>{actual}</strong>
            </h4>
          </code>
          <span className="text-muted">&nbsp;{props.valueQuantity.unit}</span>
        </div>
        <br />
        <div className="progress mt-2">
          <div
            className="progress-bar bg-transparent text-dark text-muted"
            role="progressbar"
            style={{ width: `${lowBar}%` }}
            aria-valuenow={`${lowBar}`}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <small>
              <strong data-testid="tooLow">{`< ${tooLow}`}</strong>
            </small>
          </div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: 'rgba(0,0,0,.2)',
              width: `${rangeBar}%`,
            }}
            aria-valuenow={`${rangeBar}`}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div
            className="progress-bar bg-primary rounded-circle"
            role="progressbar"
            style={{
              opacity: 0.5,
              width: `12px`,
              height: '12px',
              marginTop: '2px',
              position: 'absolute',
              left: `${valueBar - 2.5}%`,
            }}
            aria-valuenow={`${valueBar}`}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div
            className="progress-bar bg-transparent text-dark text-muted"
            role="progressbar"
            style={{ width: `${higherBar}%` }}
            aria-valuenow={`${higherBar}`}
            aria-valuemin="0"
            aria-valuemax="100"
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
