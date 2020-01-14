import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Coding from './Coding';

const CodeableConcept = props => {
  const { fhirData } = props;
  if (!Array.isArray(fhirData)) {
    return null;
  }
  return (
    <div className="fhir-datatype__CodeableConcept">
      {fhirData.map((item, i) => {
        const codingData = _get(item, 'coding.0', {});
        return <Coding key={`item-${i}`} fhirData={codingData} />;
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
