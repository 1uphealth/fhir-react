import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';

import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';

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
    <Root name="Device">
      <Header>
        {model && <Title>{model}</Title>}
        {status && <Badge>{status}</Badge>}
        {hasExpiry && (
          <BadgeSecondary data-testid="expiry">
            expires on <Date fhirData={getExpiry} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {hasTypeCoding && (
          <Value data-testid="typeCoding" label="Type">
            {getTypeCoding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </Value>
        )}
        {getUdi && <Value label="Unique device identifier">{getUdi}</Value>}
      </Body>
    </Root>
  );
};

Device.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default Device;
