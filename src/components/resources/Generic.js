import React from 'react'
var _ = require('lodash');
import ResourceContainer from '../container/ResourceContainer'
import crypto from 'crypto'

class Condition extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<ResourceContainer {...this.props}>
          <div className='container'>
            <h4>{`${this.props.fhirResource.resourceType}/${_.get(this.props.fhirResource,'id')}`} {_.get(this.props.fhirResource,'code.coding[0].display') || _.get(this.props.fhirResource,'code.text') || ''}</h4>
          </div>
  			</ResourceContainer>
      </div>
		);
	}
}

export default Condition
