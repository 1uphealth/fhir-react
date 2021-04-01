import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import { Root, Header, Title, Body, Value, Badge } from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept/CodeableConcept';

const commonDTO = fhirResource => {
  const status = _get(fhirResource, 'active') === true ? 'active' : '';
  const codes = _get(fhirResource, 'code', []);
  const specialties = _get(fhirResource, 'specialty', []);
  const organization = _get(fhirResource, 'organization');
  const practitioner = _get(fhirResource, 'practitioner');

  return {
    codes,
    status,
    specialties,
    organization,
    practitioner,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const PractitionerRole = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="PractitionerRole" />;
  }
  const {
    codes,
    status,
    specialties,
    organization,
    practitioner,
  } = fhirResourceData;
  return (
    <Root name="PractitionerRole">
      <Header>
        <Title>Practitioner roles and specialties</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
        {practitioner && (
          <Value label="Practitioner" data-testid="practitioner">
            <Reference fhirData={practitioner} />
          </Value>
        )}
        {organization && (
          <Value label="Organization" data-testid="organization">
            <Reference fhirData={organization} />
          </Value>
        )}
        {specialties.length > 0 && (
          <Value label="Specialties" data-testid="specialties">
            <CodeableConcept fhirData={specialties} />
          </Value>
        )}
        {codes.length > 0 && (
          <Value label="Roles" data-testid="roles">
            <CodeableConcept fhirData={codes} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

PractitionerRole.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3, fhirVersions.R4]).isRequired,
};

export default PractitionerRole;
