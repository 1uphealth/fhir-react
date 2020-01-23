import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import fhirVersions from '../fhirResourceVersions';
import DateType from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import { Root, Body, Header, Title, Badge, Value } from '../../ui';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const created = _get(fhirResource, 'created');

  return {
    id,
    created,
  };
};

const dstu2DTO = fhirResource => {
  const outcome = _get(fhirResource, 'outcome');

  return {
    outcome,
  };
};

const stu3DTO = fhirResource => {
  const outcome =
    _get(fhirResource, 'outcome.coding[0].display') ||
    _get(fhirResource, 'outcome.coding[0].code');

  return {
    outcome,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const ClaimResponse = props => {
  const { fhirVersion, fhirResource } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="ClaimResponse" />;
  }

  const { id, outcome, created } = fhirResourceData;

  return (
    <Root name="ClaimResponse">
      <Header>
        <Title>Claim response #{id}</Title>
        {outcome && <Badge data-testid="outcome">{outcome}</Badge>}
      </Header>
      <Body>
        {created && (
          <Value label="Created At" data-testid="created">
            <DateType fhirData={created} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

ClaimResponse.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default ClaimResponse;
