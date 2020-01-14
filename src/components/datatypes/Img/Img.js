import React from 'react';
import './Img.css';

class Img extends React.Component {
  render() {
    return (
      <div className="fhir-datatype__Img">
        <img
          className="fhir-datatype__Img__item"
          src={`data:${this.props.fhirResource.contentType};base64, ${this.props.fhirResource.content}`}
          alt=""
        />
      </div>
    );
  }
}

export default Img;
