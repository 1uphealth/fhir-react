import React from 'react';
import _get from 'lodash/get';

const Reference = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display');
  const reference = _get(fhirData, 'reference', '');
  return (
    <span>
      {display && (
        <>
          <strong>{display}</strong>{' '}
        </>
      )}
      {reference}
    </span>
  );
};

export default Reference;
