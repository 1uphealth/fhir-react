import React from 'react';
import _get from 'lodash/get';

import './Telecom.css';

const Telecom = ({ fhirData }) => {
  if (Array.isArray(fhirData)) {
    return (
      <div className="fhir-datatype__Telecom">
        {fhirData.map((item, i) => {
          const system = _get(item, 'system', '');
          return (
            <div className="fhir-datatype__Telecom__item" key={`phone-${i}`}>
              {system && (
                <span className="fhir-datatype__Telecom__item-label">
                  {system}
                </span>
              )}
              {_get(item, 'value', '')}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="fhir-datatype__Telecom">{_get(fhirData, 'value', '')}</div>
  );
};

export default Telecom;
