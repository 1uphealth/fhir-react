import React from 'react';
import PropTypes from 'prop-types';

const Quantity = props => {
  const { fhirData } = props;
  const { value, code } = fhirData;

  return (
    <span className="fhir-datatype__Quantity">
      {Number.isFinite(value) ? value : null}
      &nbsp;
      {code || null}
    </span>
  );
};

Quantity.propTypes = {
  fhirData: PropTypes.shape({
    value: PropTypes.number,
    code: PropTypes.string,
  }).isRequired,
};

export default Quantity;
