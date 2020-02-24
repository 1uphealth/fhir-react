import React from 'react';
import CodeBlock from '../CodeBlock';
import './ResourceContainer.css';

class ResourceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonOpen:
        typeof this.props.jsonOpen === 'undefined'
          ? false
          : this.props.jsonOpen,
    };
  }

  render() {
    return (
      <div className="fhir-container__ResourceContainer__card">
        <div className="fhir-container__ResourceContainer__card-body">
          <div className="fhir-container__ResourceContainer__json-button-wrapper">
            <button
              type="button"
              className="fhir-container__ResourceContainer__json-button"
              onClick={() => this.setState({ jsonOpen: !this.state.jsonOpen })}
              data-target={`${this.props.fhirResource.resourceType}/${this.props.fhirResource.id}`}
            >
              JSON
              {this.props.fhirVersion && (
                <span className="fhir-container__ResourceContainer__json-button-fhir-version">
                  &nbsp;{this.props.fhirVersion}
                </span>
              )}
            </button>
          </div>
          {this.props.children}
          <div
            className={
              this.state.jsonOpen
                ? 'fhir-container__ResourceContainer__json--visible'
                : 'fhir-container__ResourceContainer__json--hidden'
            }
          >
            <CodeBlock code={this.props.fhirResource} />
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceContainer;
