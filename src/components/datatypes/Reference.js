import React from 'react';
import _ from 'lodash';

class Reference extends React.Component {
  render() {
    return (
      <span>
        <strong>{_.get(this.props.fhirData, 'display') || ''}</strong>
        {_.get(this.props.fhirData, 'display') ? ' ' : ''}
        {_.get(this.props.fhirData, 'reference') || '' || ''}
      </span>
    );
  }
}

export default Reference;
