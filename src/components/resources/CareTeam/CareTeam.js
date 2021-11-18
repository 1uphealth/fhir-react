import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Title,
  Value,
} from '../../ui';

import CareTeamParticipants from './CareTeamParticipants';
import CodableConcept from '../../datatypes/CodeableConcept';
import DateType from '../../datatypes/Date';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';

const commonDTO = fhirResource => {
  // Default value for title - "Care team"
  const name = _get(fhirResource, 'name', 'Care team');
  const status = _get(fhirResource, 'status');
  const periodStart = _get(fhirResource, 'period.start');
  const periodEnd = _get(fhirResource, 'period.end');
  const category = _get(fhirResource, 'category');
  const subject = _get(fhirResource, 'subject');
  const managingOrganization =
    _get(fhirResource, 'managingOrganization[0]') ||
    _get(fhirResource, 'managingOrganization');

  const participants = _get(fhirResource, 'participant', []).map(item => {
    const display = _get(item, 'member.display');
    const role = _get(item, 'role.text') || _get(item, 'role.coding.0.display');
    const periodStart = _get(item, 'period.start');
    const periodEnd = _get(item, 'period.end');

    return {
      display,
      role,
      periodStart,
      periodEnd,
    };
  });

  return {
    name,
    status,
    periodStart,
    periodEnd,
    participants,
    category,
    subject,
    managingOrganization,
  };
};

const r4DTO = fhirResource => {
  const encounter = _get(fhirResource, 'encounter');

  return {
    encounter,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    // Component doesn't exist in DSTU2
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const CareTeam = props => {
  const { fhirResource, fhirVersion } = props;
  const {
    name,
    status,
    periodStart,
    periodEnd,
    participants,
    category,
    subject,
    encounter,
    managingOrganization,
  } = resourceDTO(fhirVersion, fhirResource);
  const hasParticipants = participants.length > 0;

  return (
    <Root name="CareTeam">
      <Header>
        {name && <Title>{name}</Title>}
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
        {category && (
          <Value label="Category" data-testid="category">
            <CodableConcept fhirData={category} />
          </Value>
        )}
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {encounter && (
          <Value label="Encounter" data-testid="encounter">
            <Reference fhirData={encounter} />
          </Value>
        )}
        {managingOrganization && (
          <Value
            label="Managing organization"
            data-testid="managingOrganization"
          >
            <Reference fhirData={managingOrganization} />
          </Value>
        )}
        {periodStart && (
          <Value label="Care Period Start" data-testid="periodStart">
            {periodStart ? (
              <DateType fhirData={periodStart} />
            ) : (
              <MissingValue />
            )}
          </Value>
        )}
        {periodEnd && (
          <Value label="Care Period End" data-testid="periodEnd">
            {periodEnd ? <DateType fhirData={periodEnd} /> : <MissingValue />}
          </Value>
        )}
        {hasParticipants && (
          <CareTeamParticipants participants={participants} />
        )}
      </Body>
    </Root>
  );
};

CareTeam.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default CareTeam;
