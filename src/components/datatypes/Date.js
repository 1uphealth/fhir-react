import React from 'react';

const Date = props => {
  const { fhirData } = props;
  if (!fhirData) {
    return null;
  }
  const dateValue = String(fhirData).slice(0, 10);
  return <span>{dateValue}</span>;
};

export default Date;
