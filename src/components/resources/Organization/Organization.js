import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import Coding from '../../datatypes/Coding';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Title, Body, Value } from '../../ui';

const commonDTO = fhirResource => {
  const name = _get(fhirResource, 'name');
  const addresses = _get(fhirResource, 'address');
  const telecom = _get(fhirResource, 'telecom');

  return { name, addresses, telecom };
};
const dstu2DTO = fhirResource => {
  const typeCodings = _get(fhirResource, 'type.coding');
  return { typeCodings };
};
const stu3DTO = fhirResource => {
  const typeCodings = _get(fhirResource, 'type', []).map(type => type.coding);
  return { typeCodings: _flatten(typeCodings) };
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
    case fhirVersions.R4: {
      // there are not any breaking changes between STU3 and R4 version
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Organization = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Practitioner" />;
  }
  const { name, addresses, telecom, typeCodings } = fhirResourceData;
  const hasAddresses = Array.isArray(addresses) && addresses.length > 0;
  const hasTelecom = Array.isArray(telecom) && telecom.length > 0;
  const hasTypes = Array.isArray(typeCodings) && typeCodings.length > 0;
  return (
    <Root name="Organization">
      {name && (
        <Header>
          <Title>{name}</Title>
        </Header>
      )}
      <Body>
        {hasAddresses && (
          <Value label="Addresses" data-testid="address">
            {addresses.map((item, i) => (
              <Address key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {hasTelecom && (
          <Value label="Contacts" data-testid="contact">
            {telecom.map((item, i) => (
              <Telecom key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {hasTypes && (
          <Value label="Type" data-testid="type">
            {typeCodings.map((typeCoding, idx) => (
              <Coding key={idx} fhirData={typeCoding} />
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

Organization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Organization;
