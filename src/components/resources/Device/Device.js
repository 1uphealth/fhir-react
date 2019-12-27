import React from 'react';
import Coding from '../../datatypes/Coding';
var _ = require('lodash');

class Device extends React.Component {
  render() {
    return (
      <div>
        <div style={{ width: '100%', display: 'inline-block' }}>
          <h4 style={{ display: 'inline-block' }} data-testid="title">{`${this
            .props.fhirResource.model || ''}`}</h4>
          &nbsp;({_.get(this.props.fhirResource, 'status') || ''}
          <span className="text-muted" data-testid="expiry">
            {typeof _.get(this.props.fhirResource, 'expiry') === 'undefined'
              ? ''
              : `, expires on ${_.get(this.props.fhirResource, 'expiry')}`}
          </span>
          )
        </div>
        <div className="container">
          <div className="row" data-testid="typeCoding">
            {typeof _.get(this.props.fhirResource, 'type.coding') ===
            'undefined'
              ? ''
              : _.get(this.props.fhirResource, 'type.coding').map(function(
                  coding,
                ) {
                  return <Coding fhirData={coding} />;
                })}
          </div>
          <div className="row">
            {typeof _.get(this.props.fhirResource, 'udi') === 'undefined' ? (
              ''
            ) : (
              <span>
                <small className="text-uppercase text-muted">
                  <strong>universal device identifier</strong>
                </small>
                <small> {_.get(this.props.fhirResource, 'udi')}</small>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Device;
