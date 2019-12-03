import React from 'react';

class BinaryText extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#f8f9fa' }}>
        {this.props.fhirResource.contentType === 'application/xml' ? (
          <pre className="xml-body" style={{ backgroundColor: '#f8f9fa' }}>
            {new Buffer(
              `${this.props.fhirResource.content}`,
              'base64',
            ).toString()}
          </pre>
        ) : (
          ''
        )}
        {this.props.fhirResource.contentType === 'application/json' ? (
          <pre className="json-body" style={{ backgroundColor: '#f8f9fa' }}>
            {new Buffer(
              `${this.props.fhirResource.content}`,
              'base64',
            ).toString()}
          </pre>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default BinaryText;
