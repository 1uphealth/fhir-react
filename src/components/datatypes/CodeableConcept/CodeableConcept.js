import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isObject from 'lodash/isObject';
import Coding from '../Coding';

import './CodeableConcept.css';

/**
 * Helper function for checking if parameter is not empty array or object
 * with at least one key
 * @param {any} object
 * @returns {boolean}
 */
export const hasValue = object => {
  if (Array.isArray(object)) return object.length > 0;
  if (_isObject(object)) return Object.keys(object).length > 0;

  return false;
};

const CodeableConcept = props => {
  const { fhirData } = props;
  if (!_isObject(fhirData)) return null;

  const data = Array.isArray(fhirData) ? fhirData : [fhirData];
  return (
    <div className="fhir-datatype__CodeableConcept">
      {data.map((item, i) => {
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
  fhirData: PropTypes.oneOfType([
    PropTypes.shape({
      coding: PropTypes.array,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        coding: PropTypes.array,
      }),
    ),
  ]).isRequired,
};

export default CodeableConcept;
