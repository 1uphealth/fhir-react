import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './Identifier.css';
import CodeableConcept from '../CodeableConcept';

const Identifier = props => {
  const { fhirData, valueOnly = false } = props;
  const identifierArray = Array.isArray(fhirData) ? fhirData : [fhirData];

  return identifierArray.map(identifier => {
    const value = _get(identifier, 'value', '');
    const system = _get(identifier, 'system', '');
    const type = _get(identifier, 'type', null);

    const displayIdentifierName = type ? (
      <>
        <CodeableConcept fhirData={type} />
        <span>:&nbsp;</span>
      </>
    ) : (
      <span>Identifier:&nbsp;</span>
    );

    return value ? (
      <div className="fhir-datatype__Identifier" title={system} key={value}>
        <div style={{ display: 'flex' }}>
          {!valueOnly && displayIdentifierName}
          <span>{value}</span>
        </div>
      </div>
    ) : null;
  });
};

Identifier.propTypes = {
  fhirData: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string,
      system: PropTypes.string,
    }),
    PropTypes.array,
  ]).isRequired,
};

export default Identifier;
