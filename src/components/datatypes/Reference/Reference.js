import React from 'react';
import _get from 'lodash/get';

import './Reference.css';

const Reference = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display');
  const reference = _get(fhirData, 'reference', '');
  return (
    <div
      className="fhir-datatype__Reference d-inline-block"
      data-testid={props['data-testid']}
    >
      {display && <span className="mr-2 pe-1">{display}</span>}
      <span>{reference}</span>
    </div>
  );
};

export default Reference;
