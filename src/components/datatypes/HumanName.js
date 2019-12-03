import React from 'react';
import _ from 'lodash';

class HumanName extends React.Component {
  render() {
    if (!this.props.primary && this.props.primary !== 'undefined') {
      return (
        <span className="text-muted">
          <strong>{`${_.get(this.props.fhirData, 'given') || ''} ${_.get(
            this.props.fhirData,
            'family',
          ) || ''} ${(_.get(this.props.fhirData, 'suffix') || []).join(
            ' ',
          )}`}</strong>
          &nbsp;<small>({_.get(this.props.fhirData, 'use')})</small>
        </span>
      );
    } else {
      return (
        <span>
          <h4 style={{ display: 'inline-block' }}>{`${_.get(
            this.props.fhirData,
            'given',
          ) || ''} ${_.get(this.props.fhirData, 'family') || ''} ${(
            _.get(this.props.fhirData, 'suffix') || []
          ).join(' ')}`}</h4>
          &nbsp;<small>({_.get(this.props.fhirData, 'use')})</small>
        </span>
      );
    }
  }
}

export default HumanName;
