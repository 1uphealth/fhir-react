import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import EncounterParticipants from './EncounterParticipants';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import DateType from '../../datatypes/Date';

import {
  Root,
  Header,
  Title,
  Body,
  Value,
  MissingValue,
  Badge,
} from '../../ui';

const commonDTO = fhirResource => {
  let periodEnd = _get(fhirResource, 'period.end');
  periodEnd = periodEnd ? new Date(periodEnd).toLocaleString() : ' - ';

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart ? (
    new Date(_get(fhirResource, 'period.start')).toLocaleString()
  ) : (
    <MissingValue />
  );
  const locationDisplay = _get(
    fhirResource,
    'location[0].location.display',
    null,
  );
  const hasParticipant = _has(fhirResource, 'participant');
  return {
    periodEnd,
    periodStart,
    locationDisplay,
    hasParticipant,
  };
};

const dstu2DTO = fhirResource => {
  const resourceClass = _get(fhirResource, 'class');
  const resourceStatus = _get(fhirResource, 'status');
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    periodStart = new Date(periodStart).toLocaleString();

    return {
      display: _get(item, 'type[0].coding[0].display'),
      text: _get(item, 'type[0].text'),
      periodStart,
    };
  });

  return {
    resourceClass,
    resourceStatus,
    participant,
  };
};

const stu3DTO = fhirResource => {
  let periodEnd = _get(fhirResource, 'period.end');
  periodEnd = periodEnd ? <DateType fhirData={periodEnd} /> : <MissingValue />;

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart ? (
    <DateType fhirData={periodStart} />
  ) : (
    <MissingValue />
  );
  const resourceClass = _get(fhirResource, 'class.display');
  const resourceStatus = _get(fhirResource, 'status');
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    if (periodStart) {
      periodStart = <DateType fhirData={periodStart} />;
    }
    return {
      display: <MissingValue />,
      text: _get(item, 'individual.display'),
      periodStart,
    };
  });

  return {
    periodStart,
    periodEnd,
    resourceClass,
    resourceStatus,
    participant,
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

const Encounter = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Encounter" />;
  }
  const {
    periodEnd,
    periodStart,
    hasParticipant,
    locationDisplay,
    resourceClass,
    resourceStatus,
    participant,
  } = fhirResourceData;

  return (
    <Root name="encounter">
      <Header>
        <Title>{locationDisplay}</Title>
        {resourceStatus && <Badge>{resourceStatus}</Badge>}
      </Header>
      <Body>
        {periodStart && <Value label="Start date">{periodStart}</Value>}
        {periodEnd && <Value label="End date">{periodEnd}</Value>}
        {resourceClass && <Value label="Class">{resourceClass}</Value>}
        {hasParticipant && (
          <EncounterParticipants allParticipant={participant} />
        )}
      </Body>
    </Root>
  );
};

Encounter.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default Encounter;
