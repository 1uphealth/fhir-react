import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import { Root, Header, Title, Value, Body } from '../../ui';

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
    <Root name="explanationOfBenefit">
      <Header>
        <Title>{disposition}</Title>
      </Header>
      <Body>
        {created && (
          <Value label="Created" data-testid="created">
            {created}
          </Value>
        )}
        {insurer && (
          <Value label="Insurer" data-testid="insurer">
            <Reference fhirData={insurer} />
          </Value>
        )}
        {totalCost && (
          <Value label="Total cost" data-testid="totalCost">
            {totalCost.value || ''}&nbsp;{totalCost.code}
          </Value>
        )}
        {totalBenefit && (
          <Value label="Total benefit" data-testid="totalBenefit">
            {totalBenefit.value || ''}&nbsp;{totalBenefit.code}
          </Value>
        )}
      </Body>
    </Root>
  );
};

ExplanationOfBenefit.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default ExplanationOfBenefit;
