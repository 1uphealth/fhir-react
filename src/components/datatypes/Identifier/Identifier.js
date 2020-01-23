import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const Identifier = props => {
  const { fhirData } = props;
  const value = _get(fhirData, 'value', '');
  const system = _get(fhirData, 'system', '');

  return value ? (
    <abbr className="fhir-datatype__Identifier" title={system}>
      {value}
    </abbr>
  ) : null;
};

Identifier.propTypes = {
  fhirData: PropTypes.shape({
    value: PropTypes.string,
    system: PropTypes.string,
  }).isRequired,
};

export default Identifier;
