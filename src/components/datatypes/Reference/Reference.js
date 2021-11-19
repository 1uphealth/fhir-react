import './Reference.css';

import React from 'react';
import _get from 'lodash/get';

const Reference = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display');
  return (
    <div
      className="fhir-datatype__Reference"
      data-testid={props['data-testid']}
    >
      {display && (
        <span className="fhir-datatype__Reference__title mr-2 pe-1">
          {display}
        </span>
      )}
    </div>
  );
};

export default Reference;
