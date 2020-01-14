import React from 'react';
import _get from 'lodash/get';

const Telecom = props => {
  const { fhirData } = props;
  if (Array.isArray(fhirData)) {
    return (
      <div className="fhir-datatype__Telecom">
        {fhirData.map((item, i) => (
          <div className="fhir-datatype__Telecom__item" key={`phone-${i}`}>
            {_get(item, 'value', '')}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="fhir-datatype__Telecom">{_get(fhirData, 'value', '')}</div>
  );
};

export default Telecom;
