import React from 'react'
var _ = require('lodash');

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
        <div className='card bg-dark border-0' style={{width: '100%'}}>
          <div className="card-body" style={{width: '100%'}}>
            <code>
              <pre className="text-light">
                {JSON.stringify(this.props.code, null, 2)}
              </pre>
            </code>
          </div>
        </div>
      </div>
		);
	}
}

export default ResourceContainer
