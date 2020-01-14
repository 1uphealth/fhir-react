import React from 'react';

class BinaryText extends React.Component {
  render() {
    return (
      <div className="fhir-datatype__BinaryText">
        {this.props.fhirResource.contentType === 'application/xml' ? (
          <pre className="fhir-datatype__BinaryText__xmlBody-block">
            {new Buffer(
              `${this.props.fhirResource.content}`,
              'base64',
            ).toString()}
          </pre>
        ) : (
          ''
        )}
        {this.props.fhirResource.contentType === 'application/json' ? (
          <pre className="fhir-datatype__BinaryText__jsonBody-block">
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
