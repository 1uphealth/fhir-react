import React from 'react';
const _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer';
import Coding from '../datatypes/Coding';

class ObservationGraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (
      typeof this.props.referenceRange !== 'undefined' &&
      typeof _.get(this.props, 'valueQuantity.value') !== 'undefined'
    ) {
      const tooLow = _.get(this.props, 'referenceRange[0].low.value');
      const tooHigh = _.get(this.props, 'referenceRange[0].high.value');
      const actual = this.props.valueQuantity.value;
      const maxNum = Math.max(tooHigh, actual);
      const minNum = Math.min(tooLow, actual);
      const startAt = (maxNum - minNum) * -0.5 + minNum;
      const endAt = (maxNum - minNum) * 0.5 + maxNum;
      const zeroShift = 0 - startAt;
      const lowBar = Math.round(((zeroShift + tooLow) / endAt) * 100);
      const rangeBar =
        Math.round(((zeroShift + tooHigh) / endAt) * 100) - lowBar;
      const valueBar = Math.round(((zeroShift + actual) / endAt) * 100) + 3;
      const higherBar = 100 - rangeBar - lowBar;
      return (
        <div className="col-md-12 mt-2 mb-2 pl-0 pr-0">
          <div
            style={{
              position: 'absolute',
              left: `${valueBar -
                Math.max(2.5, actual.toString().length * 2)}%`,
            }}
          >
            <code style={{ display: 'inline-block' }}>
              <h4>
                <strong>{actual}</strong>
              </h4>
            </code>
            <span className="text-muted">
              &nbsp;{this.props.valueQuantity.unit}
            </span>
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
                <strong>{`< ${tooLow}`}</strong>
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
                <strong>{`> ${tooHigh}`}</strong>
              </small>
            </div>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

class Observation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <h4 style={{ display: 'inline-block' }}>
              {`${_.get(this.props.fhirResource, 'code.coding.0.display') ||
                _.get(this.props.fhirResource, 'code.text')}`}{' '}
              <code>{`${_.get(this.props.fhirResource, 'valueQuantity.value') ||
                ''}${_.get(this.props.fhirResource, 'valueQuantity.unit') ||
                ''}`}</code>
              <span className="text-muted">
                &nbsp;({_.get(this.props.fhirResource, 'status') || ''}&nbsp;
                {_.get(this.props.fhirResource, 'valueCodeableConcept.text') ||
                  _.get(
                    this.props.fhirResource,
                    'valueCodeableConcept.coding[0].display'
                  )}
                )
              </span>
            </h4>
          </div>
          <div className="row">
            <ObservationGraph
              valueQuantity={this.props.fhirResource.valueQuantity}
              referenceRange={this.props.fhirResource.referenceRange}
            />
          </div>
          <div className="row" style={{ display: 'unset !important' }}>
            <small className="text-muted text-uppercase">
              <strong>Issued on:</strong>
            </small>
            &nbsp;
            <Date fhirData={this.props.fhirResource.issued} />
          </div>
          <div className="row">
            {typeof _.get(
              this.props.fhirResource,
              'valueCodeableConcept.coding'
            ) === 'undefined'
              ? ''
              : _.get(
                  this.props.fhirResource,
                  'valueCodeableConcept.coding'
                ).map(function(coding) {
                  return (
                    <div className="col-md-12">
                      <Coding fhirData={coding} />
                    </div>
                  );
                })}
          </div>
        </ResourceContainer>
      </div>
    );
  }
}
export default Observation;
