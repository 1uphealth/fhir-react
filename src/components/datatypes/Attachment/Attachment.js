import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import './Attachment.css';

const Attachment = props => {
  const { fhirData, isImage = false } = props;
  const title = _get(fhirData, 'title', 'Link');
  const URL = _get(fhirData, 'url');
  return (
    <a href={URL} rel="noopener noreferrer" target="_blank">
      {isImage ? (
        <img className="fhir-datatype__Attachment__img" src={URL} alt={title} />
      ) : (
        title
      )}
    </a>
  );
};

Attachment.propTypes = {
  fhirData: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Attachment;
