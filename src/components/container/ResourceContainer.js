import React from 'react'
var _ = require('lodash');

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<div className='card bg-light'>
          <div className="card-body">
            <h5 class="card-title">{_.get(this.props.fhirResource,'resourceType')}</h5>
            {this.props.children}
            <code>
              <pre>
                {JSON.stringify(this.props.fhirResource, null, 2)}
              </pre>
            </code>
          </div>
  			</div>
      </div>
		);
	}
}

export default ResourceContainer
