import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './Coding.css';

const Coding = props => {
  const { fhirData } = props;
  const display = _get(fhirData, 'display', '');
  const code = _get(fhirData, 'code', '');
  const system = _get(fhirData, 'system', '');
  const hasAdditionalInfo = code || system;
  return (
    <div className="fhir-datatype__Coding">
      <span className="fhir-datatype__Coding__title">{display}</span>&nbsp;
      {hasAdditionalInfo && (
        <span className="fhir-datatype__Coding__code" title={system}>
          ({code})
        </span>
      )}
    </div>
  );
};

Coding.propTypes = {
  fhirData: PropTypes.shape({}).isRequired,
};

export default Coding;
