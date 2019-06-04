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
  				<div>this is a patient resourcagwgawggae</div>
          <HumanName />
  			</ResourceContainer>
      </div>
		);
	}
}

export default Patient
