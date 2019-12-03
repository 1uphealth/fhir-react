import React from 'react';
import _ from 'lodash';

class Telecom extends React.Component {
  render() {
    return <div>{`${_.get(this.props.fhirData, 'value') || ''}`}</div>;
  }
}

export default Telecom;
