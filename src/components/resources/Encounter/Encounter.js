import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import _unescape from 'lodash/unescape';
import EncounterParticipants from './EncounterParticipants';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import DateType from '../../datatypes/Date';
import CodableConcept from '../../datatypes/CodeableConcept';

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
  const resourceStatus = _get(fhirResource, 'status');
  const locationDisplayRaw = _get(
    fhirResource,
    'location[0].location.display',
    'Encounter',
  );
  const locationDisplay = _unescape(locationDisplayRaw);
  const encounterType = _get(fhirResource, 'type');
  const hasParticipant = _has(fhirResource, 'participant');
  return {
    resourceStatus,
    locationDisplay,
    hasParticipant,
    encounterType,
  };
};

const dstu2DTO = fhirResource => {
  let periodEnd = _get(fhirResource, 'period.end');
  periodEnd = periodEnd ? new Date(periodEnd).toLocaleString() : ' - ';

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart ? (
    new Date(_get(fhirResource, 'period.start')).toLocaleString()
  ) : (
    <MissingValue />
  );
  const resourceClass = _get(fhirResource, 'class');
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    periodStart = new Date(periodStart).toLocaleString();
    const reference = _get(item, 'individual', {});
    return {
      display: _get(item, 'type[0].coding[0].display', <MissingValue />),
      reference: reference,
      text: _get(item, 'type[0].text'),
      periodStart,
    };
  });

  return {
    periodEnd,
    periodStart,
    resourceClass,
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
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    if (periodStart) {
      periodStart = <DateType fhirData={periodStart} />;
    }
    const reference = _get(item, 'individual', {});
    return {
      display: _get(item, 'type[0].coding[0].display', <MissingValue />),
      reference: reference,
      text: _get(item, 'type[0].text'),
      periodStart,
    };
  });

  return {
    periodStart,
    periodEnd,
    resourceClass,
    participant,
  };
};

const r4DTO = fhirResource => {
  let periodEnd = _get(fhirResource, 'period.end');
  periodEnd = periodEnd ? <DateType fhirData={periodEnd} /> : <MissingValue />;

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart ? (
    <DateType fhirData={periodStart} />
  ) : (
    <MissingValue />
  );
  const resourceClass = _get(fhirResource, 'class.display');
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    if (periodStart) {
      periodStart = <DateType fhirData={periodStart} />;
    }
    const reference = _get(item, 'individual', {});
    return {
      display: _get(item, 'type[0].coding[0].display', <MissingValue />),
      reference: reference,
      text: _get(item, 'type[0].text'),
      periodStart,
    };
  });
  return {
    resourceClass,
    periodStart,
    periodEnd,
    participant,
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
    encounterType,
    resourceClass,
    resourceStatus,
    participant,
  } = fhirResourceData;
  return (
    <Root name="encounter">
      <Header>
        <Title data-testid="title">{locationDisplay}</Title>
        {resourceStatus && <Badge>{resourceStatus}</Badge>}
      </Header>
      <Body>
        {periodStart && <Value label="Start date">{periodStart}</Value>}
        {periodEnd && <Value label="End date">{periodEnd}</Value>}
        {encounterType && (
          <Value label="Type" data-testid="encounterType">
            <CodableConcept fhirData={encounterType} />
          </Value>
        )}
        {resourceClass && (
          <Value label="Class" data-testid="resourceClass">
            {resourceClass}
          </Value>
        )}
        {hasParticipant && (
          <EncounterParticipants allParticipant={participant} />
        )}
      </Body>
    </Root>
  );
};

Encounter.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Encounter;
