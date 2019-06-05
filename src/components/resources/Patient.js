import React from 'react'
var _ = require('lodash');
import HumanName from '../datatypes/HumanName'
import ResourceContainer from '../container/ResourceContainer'

class Patient extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<ResourceContainer fhirResource={this.props.fhirResource}>
          {(_.get(this.props.fhirResource,'name') || []).map(function(patientName, index){
            return <span><HumanName fhirData={patientName} index={index}/>&nbsp;&nbsp;</span>
          })}
  			</ResourceContainer>
      </div>
		);
	}
}

export default Patient
