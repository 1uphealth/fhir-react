import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';

const Coverage = props => {
  const { fhirResource } = props;
  const planId = _get(fhirResource, 'plan');
  const issuer = _get(fhirResource, 'issuer');
  const period = _has(fhirResource, 'period');
  const coverageFrom = _get(fhirResource, 'period.start');
  const coverageTo = _get(fhirResource, 'period.end');
  const type = _get(fhirResource, 'type');
  return (
    <div>
      <div data-testid="planId">
        Plan: {planId}{' '}
        {issuer && (
          <span data-testid="issuer">
            (
            <Reference fhirData={issuer} />)
          </span>
        )}
      </div>
      {period && (
        <div>
          <label>Coverage:</label>(
          {coverageFrom && (
            <span data-testid="coverageFrom">from: {coverageFrom}</span>
          )}{' '}
          {coverageTo && <span data-testid="coverageTo">to: {coverageTo}</span>}
          )
        </div>
      )}
      {type && (
        <div data-testid="type">
          <label>Type of coverage: </label>
          <Coding fhirData={type} />
        </div>
      )}
    </div>
  );
};

Coverage.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Coverage;
