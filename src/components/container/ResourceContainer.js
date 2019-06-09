import React from 'react'
var _ = require('lodash');
import CodeBlock from './CodeBlock'

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonOpen: typeof this.props.jsonOpen === 'undefined' ? false : this.props.jsonOpen,
    };
  }

	render() {
		return (
      <div>
  			<div className='card bg-light border-0'>
          <div className="card-body">
            {this.props.children}
            <div style={{position:'absolute', right: '1rem', top: '1rem'}}>
              <button
                onClick={() => this.setState({ jsonOpen: !this.state.jsonOpen })}
                data-target={`${this.props.fhirResource.resourceType}/${this.props.fhirResource.id}`}
                type="button"
                className="btn btn-outline-secondary btn-sm"
              >
                JSON
              </button>
            </div>
            <div style={{display: (this.state.jsonOpen ? 'inline' : 'none')}}>
              <br />
              <CodeBlock code={this.props.fhirResource} />
            </div>
          </div>
  			</div>
      </div>
		);
	}
}

export default ResourceContainer
