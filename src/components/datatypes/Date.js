import React from 'react';

class Date extends React.Component {
  render() {
    return <span>{this.props.fhirData.slice(0, 10)}</span>;
  }
}

export default Date;
