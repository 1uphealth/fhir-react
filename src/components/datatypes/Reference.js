import React from 'react';
import _get from 'lodash/get';

const Reference = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display');
  const reference = _get(fhirData, 'reference', '');
  return (
    <div className="fhir-datatype__Reference">
      {display && (
        <span className="fhir-datatype__Reference__title">{display}</span>
      )}
      <span className="fhir-datatype__Reference__details"></span>
      {reference}
    </div>
  );
};

export default Reference;
