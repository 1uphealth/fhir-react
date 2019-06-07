import React from 'react'
var _ = require('lodash');
import CodeBlock from './CodeBlock'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs';

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
  			<div className='card bg-light border-0' style={{'marginBottom':'.5rem'}}>
          <div className="card-body">
            {this.props.children}
            <div style={{position:'absolute', right: '1rem', top: '1rem'}}>
              <button
                onClick={() => this.setState({ jsonOpen: !this.state.jsonOpen })}
                data-target={`${this.props.fhirResource.resourceType}/${this.props.fhirResource.id}`}
                type="button"
                class="btn btn-outline-secondary btn-sm"
              >
                JSON
              </button>
            </div>
            <div style={{display: (this.state.jsonOpen ? 'inline' : 'none')}}>
              <br />
              <pre className="bg-dark" style={{border:'0px solid #fff', borderRadius:'4px', scroll: 'hidden', paddingBottom:'0rem', lineHeight:'2', fontSize:'1rem'}}>
                <code>
                <SyntaxHighlighter language='json' style={atomOneDark}>
                {JSON.stringify(this.props.fhirResource,null,2)}
                    </SyntaxHighlighter>
                </code>
              </pre>

            </div>
          </div>
  			</div>
      </div>
		);
	}
}

export default ResourceContainer
