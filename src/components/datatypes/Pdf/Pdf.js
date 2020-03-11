import React from 'react';

const Pdf = props => {
  const { fhirResource } = props;
  const maxHeight = 600;
  const contentHeight = (1111 * fhirResource.content.length) / (24996 / 7.5);
  const height = Math.min(maxHeight, contentHeight);

  return (
    <div className="fhir-datatype__Pdf">
      <embed
        src={`data:${fhirResource.contentType};base64,${fhirResource.content}`}
        type={fhirResource.contentType}
        width="100%"
        height={height}
      />
    </div>
  );
};

export default Pdf;
