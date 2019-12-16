import React from 'react';
import _get from 'lodash/get';

const Telecom = props => {
  const { fhirData } = props;
  if (Array.isArray(fhirData)) {
    return fhirData.map((item, i) => (
      <div key={`phone-${i}`}>{_get(item, 'value', '')}</div>
    ));
  }
  return <div>{_get(fhirData, 'value', '')}</div>;
};

export default Telecom;
