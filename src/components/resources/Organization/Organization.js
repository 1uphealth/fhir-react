import React from 'react';
import PropTypes from 'prop-types';

const Organization = props => {
  const { fhirResource } = props;
  return <div>Organization</div>;
};

Organization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Organization;
