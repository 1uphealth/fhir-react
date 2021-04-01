import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './Identifier.css';

const Identifier = props => {
  const { fhirData } = props;
  const value = _get(fhirData, 'value', '');
  const system = _get(fhirData, 'system', '');

  return value ? (
    <span className="fhir-datatype__Identifier" title={system}>
      {value}
    </span>
  ) : null;
};

Identifier.propTypes = {
  fhirData: PropTypes.shape({
    value: PropTypes.string,
    system: PropTypes.string,
  }).isRequired,
};

export default Identifier;
