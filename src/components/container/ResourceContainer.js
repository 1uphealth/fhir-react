import React from 'react'

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div>
  			<div className='card bg-light'>
          <div className="card-body">
            {this.props.children}
            <code style={{visiblity:'hidden'}}>
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
