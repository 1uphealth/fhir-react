import React from 'react'
var _ = require('lodash');
import Generic from '../resources/Generic'
import Patient from '../resources/Patient'
import Condition from '../resources/Condition'
import Encounter from '../resources/Encounter'
import MedicationOrder from '../resources/MedicationOrder'
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
      case 'MedicationOrder':
        return (<MedicationOrder {...this.props}/>)
      case 'Condition':
        return (<Condition {...this.props}/>)
      case 'Encounter':
        return (<Encounter {...this.props}/>)
      default:
        return (<Generic {...this.props}/>);
    }
  }

	render() {
		return (
      this.renderSwitch()
		);
	}
}

export default FhirResource
