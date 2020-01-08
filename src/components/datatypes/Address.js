import React from 'react';
import _get from 'lodash/get';

const Address = props => {
  const { fhirData } = props;
  const city = _get(fhirData, 'city');
  const line = _get(fhirData, 'line', []).join(' ');
  const state = _get(fhirData, 'state');
  const postalCode = _get(fhirData, 'postalCode', '');
  const country = _get(fhirData, 'country', '');
  return (
    <div>
      <div>{line}</div>
      <div>
        {city && <span>{city},</span>} <span>{state}</span>{' '}
        <span>{postalCode}</span> <span>{country}</span>
      </div>
    </div>
  );
};

export default Address;
