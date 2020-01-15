import React from 'react';

import './BinaryText.css';

const BinaryText = props => {
  const { fhirResource } = props;
  const decoded = Buffer.from(fhirResource.content, 'base64').toString();

  return (
    <div className="fhir-datatype__BinaryText">
      <pre className="fhir-datatype__BinaryText__block">{decoded}</pre>
    </div>
  );
};

export default BinaryText;
