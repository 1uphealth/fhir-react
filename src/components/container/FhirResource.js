import React from 'react'
var _ = require('lodash');
import Patient from '../resources/Patient'
import ResourceContainer from './ResourceContainer'
import crypto from 'crypto'

class FhirResource extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSwitch() {
    switch(this.props.fhirResource.resourceType) {
      case 'Patient':
        return (<Patient {...this.props}/>)
      default:
        return 'foo';
    }
  }

	render() {
		return (
      this.renderSwitch()
		);
	}
}

export default FhirResource
