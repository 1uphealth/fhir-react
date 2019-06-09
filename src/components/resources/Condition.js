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
            <h4>{_.get(this.props.fhirResource,'code.coding[0].display') || _.get(this.props.fhirResource,'code.text') || ''}</h4>
            {_.get(this.props.fhirResource, 'dateRecorded') ?
              (<div><small className='text-muted text-uppercase'><strong>Date recorded:</strong></small> {_.get(this.props.fhirResource, 'dateRecorded') || ''}</div>) :
            ''}
          </div>
  			</ResourceContainer>
      </div>
		);
	}
}

export default Condition
