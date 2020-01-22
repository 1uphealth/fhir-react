import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

const Attachment = props => {
  const { fhirData } = props;
  const title = _get(fhirData, 'title', 'Link');
  const URL = _get(fhirData, 'url');
  return (
    <a href={URL} rel="noopener noreferrer" target="_blank">
      {title}
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
