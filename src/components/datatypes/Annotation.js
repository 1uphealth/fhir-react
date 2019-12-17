import React from 'react';
import PropTypes from 'prop-types';

const Annotation = props => {
  const { fhirData } = props;
  if (!Array.isArray(fhirData)) {
    return null;
  }
  return (
    <ul>
      {fhirData.map((item, i) => (
        <li key={`item-${i}`}>{item.text}</li>
      ))}
    </ul>
  );
};

Annotation.propTypes = {
  fhirData: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string.isRequired }),
  ),
};

export default Annotation;
