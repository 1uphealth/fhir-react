import React from 'react';

class ResourceContainer extends React.Component {
  render() {
    return (
      <pre className="fhir-container__CodeBlock">
        {JSON.stringify(this.props.code, null, 2)}
      </pre>
    );
  }
}

export default ResourceContainer;
