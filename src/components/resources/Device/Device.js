import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import fhirTypes from '../fhirResourceTypes';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

const commonDTO = fhirResource => {
  const model = _get(fhirResource, 'model', '');
  const status = _get(fhirResource, 'status', '');
  const getTypeCoding = _get(fhirResource, 'type.coding');
  const hasTypeCoding = Array.isArray(getTypeCoding);

  return {
    model,
    status,
    getTypeCoding,
    hasTypeCoding,
  };
};

const dstu2DTO = fhirResource => {
  const getUdi = _get(fhirResource, 'udi');
  const hasExpiry = _has(fhirResource, 'expiry');
  const getExpiry = _get(fhirResource, 'expiry');
  return {
    getUdi,
    hasExpiry,
    getExpiry,
  };
};
const stu3DTO = fhirResource => {
  const getUdi = _get(fhirResource, 'udi.name');
  const hasExpiry = _has(fhirResource, 'expirationDate');
  const getExpiry = _get(fhirResource, 'expirationDate');
  return {
    getUdi,
    hasExpiry,
    getExpiry,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Device = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Device" />;
  }

  const {
    model,
    status,
    hasExpiry,
    getExpiry,
    getTypeCoding,
    hasTypeCoding,
    getUdi,
  } = fhirResourceData;

  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {model}
        </h4>
        &nbsp;({status}
        {hasExpiry && (
          <span className="text-muted" data-testid="expiry">
            , expires on <Date fhirData={getExpiry} />
          </span>
        )}
        )
      </div>
      <div className="container">
        {hasTypeCoding && (
          <div className="row" data-testid="typeCoding">
            {getTypeCoding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </div>
        )}
        <div className="row">
          {getUdi && (
            <span>
              <small className="text-uppercase text-muted">
                <strong>universal device identifier</strong>
              </small>
              <small>{getUdi}</small>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Device.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Device;
