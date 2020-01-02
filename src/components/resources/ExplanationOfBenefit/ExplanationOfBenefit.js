import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

const commonDTO = fhirResource => {
  const disposition = _get(fhirResource, 'disposition');
  const created = _get(fhirResource, 'created');
  const insurer = _get(fhirResource, 'organization');
  return {
    disposition,
    created,
    insurer,
  };
};
const dstu2DTO = () => {
  return {};
};
const stu3DTO = fhirResource => {
  const totalBenefit = _get(fhirResource, 'totalBenefit', {});
  const totalCost = _get(fhirResource, 'totalCost', {});
  return { totalBenefit, totalCost };
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

const ExplanationOfBenefit = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return (
      <UnhandledResourceDataStructure resourceName="ExplanationOfBenefit" />
    );
  }

  const {
    disposition,
    created,
    insurer,
    totalBenefit,
    totalCost,
  } = fhirResourceData;

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
      {totalCost && (
        <div data-testid="totalCost">
          <label>Total cost:</label>
          {totalCost.value || ''}&nbsp;{totalCost.code}
        </div>
      )}
      {totalBenefit && (
        <div data-testid="totalBenefit">
          <label>Total benefit:</label>
          {totalBenefit.value || ''}&nbsp;{totalBenefit.code}
        </div>
      )}
    </div>
  );
};

ExplanationOfBenefit.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']).isRequired,
};

export default ExplanationOfBenefit;
