import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const Coding = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display', '');
  const code = _get(fhirData, 'code', '');
  const system = _get(fhirData, 'system', '');
  return (
    <div>
      <span>{display}</span>&nbsp;
      <abbr className="text-uppercase" title={system}>
        ({code})
      </abbr>
    </div>
  );
};

Coding.propTypes = {
  fhirData: PropTypes.shape({}).isRequired,
};

export default Coding;
