import React from 'react';
import ResourceContainer from '../../container/ResourceContainer';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
var _ = require('lodash');

class ObservationGraph extends React.Component {
  render() {
    if (
      typeof this.props.referenceRange !== 'undefined' &&
      typeof _.get(this.props, 'valueQuantity.value') !== 'undefined'
    ) {
      var tooLow = _.get(this.props, 'referenceRange[0].low.value');
      var tooHigh = _.get(this.props, 'referenceRange[0].high.value');
      var actual = this.props.valueQuantity.value;
      var maxNum = Math.max(tooHigh, actual);
      var minNum = Math.min(tooLow, actual);
      var startAt = (maxNum - minNum) * -0.5 + minNum;
      var endAt = (maxNum - minNum) * 0.5 + maxNum;
      var zeroShift = 0 - startAt;
      var lowBar = Math.round(((zeroShift + tooLow) / endAt) * 100);
      var rangeBar = Math.round(((zeroShift + tooHigh) / endAt) * 100) - lowBar;
      var valueBar = Math.round(((zeroShift + actual) / endAt) * 100) + 3;
      var higherBar = 100 - rangeBar - lowBar;
      return (
        <div className="col-md-6 mt-2 mb-2 pl-0 pr-0">
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
            </h4>
            &nbsp;({_.get(this.props.fhirResource, 'status') || ''}&nbsp;
            <span className="text-muted">
              {_.get(this.props.fhirResource, 'valueCodeableConcept.text') ||
                _.get(
                  this.props.fhirResource,
                  'valueCodeableConcept.coding[0].display',
                )}
            </span>
            )
          </div>
          <div className="container">
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
                'valueCodeableConcept.coding',
              ) === 'undefined'
                ? ''
                : _.get(
                    this.props.fhirResource,
                    'valueCodeableConcept.coding',
                  ).map(function(coding) {
                    return <Coding fhirData={coding} />;
                  })}
            </div>
          </div>
        </ResourceContainer>
      </div>
    );
  }
}
export default Observation;
