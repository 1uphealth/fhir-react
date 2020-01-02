import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';

const ExplanationOfBenefit = props => {
  const { fhirResource } = props;
  const disposition = _get(fhirResource, 'disposition');
  const created = _get(fhirResource, 'created');
  const insurer = _get(fhirResource, 'organization');

  return (
    <div>
      <h4 data-testid="title">{disposition}</h4>
      <label>Created:</label>
      <small data-testid="created">{created}</small>
      {insurer && (
        <div data-testid="insurer">
          <label>Insurer: </label>
          <small>
            <Reference fhirData={insurer} />
          </small>
        </div>
      )}
    </div>
  );
};

ExplanationOfBenefit.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default ExplanationOfBenefit;
