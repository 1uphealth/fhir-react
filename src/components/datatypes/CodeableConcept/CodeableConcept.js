import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from '../Coding';

import './CodeableConcept.css';

const CodeableConcept = props => {
  const { fhirData } = props;
  if (!Array.isArray(fhirData)) {
    return null;
  }
  return (
    <div className="fhir-datatype__CodeableConcept">
      {fhirData.map((item, i) => {
        const text = _get(item, 'text', '');
        const coding = _get(item, 'coding', []);
        return (
          <div
            key={`item-${i}`}
            className="fhir-datatype__CodeableConcept-item"
          >
            {text && (
              <span className="fhir-datatype__CodeableConcept-item-label">
                {text}
              </span>
            )}
            {coding.map((codingData, j) => (
              <Coding key={`codingData-${j}`} fhirData={codingData} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

CodeableConcept.propTypes = {
  fhirData: PropTypes.arrayOf(
    PropTypes.shape({
      coding: PropTypes.array,
    }),
  ).isRequired,
};

export default CodeableConcept;
