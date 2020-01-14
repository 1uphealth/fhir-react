import React from 'react';

const Date = props => {
  const { fhirData } = props;
  if (!fhirData) {
    return null;
  }
  const dateValue = String(fhirData).slice(0, 10);
  return <span className="fhir-datatype__Date">{dateValue}</span>;
};

export default Date;
