import React from 'react'
var _ = require('lodash');

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<div className='card bg-light border-0'>
          <div className="card-body">
            {this.props.children}
          </div>
  			</div>
      </div>
		);
	}
}

export default ResourceContainer

// <code>
//   <pre>
//     {JSON.stringify(this.props.fhirResource, null, 2)}
//   </pre>
// </code>
