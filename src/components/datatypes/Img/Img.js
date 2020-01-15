import React from 'react';
import './Img.css';

const Img = props => {
  const { fhirResource } = props;

  return (
    <div className="fhir-datatype__Img">
      <img
        className="fhir-datatype__Img__item"
        src={`data:${fhirResource.contentType};base64,${fhirResource.content}`}
        alt=""
      />
    </div>
  );
};

export default Img;
