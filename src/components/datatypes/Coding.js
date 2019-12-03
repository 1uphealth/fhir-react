import React from 'react';
import _ from 'lodash';

class Coding extends React.Component {
  render() {
    return (
      <div>
        <div>
          <strong>{_.get(this.props.fhirData, 'display') || ''}</strong>&nbsp;
          <span className="text-uppercase">
            ({_.get(this.props.fhirData, 'code') || ''})
          </span>
          &nbsp;
          <small>{_.get(this.props.fhirData, 'system') || ''}</small>
        </div>
      </div>
    );
  }
}

export default Coding;
