import React from 'react';
import PropTypes from 'prop-types';

const Money = props => {
  const { fhirData } = props;
  const { value, code } = fhirData;

  return (
    <span className="fhir-datatype__Money">
      {value || ''}&nbsp;{code || ''}
    </span>
  );
};

Money.propTypes = {
  fhirData: PropTypes.shape({}).isRequired,
};

export default Money;
