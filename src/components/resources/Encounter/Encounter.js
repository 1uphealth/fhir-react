import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import EncounterParticipants from './EncounterParticipants';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import DateType from '../../datatypes/Date';

const commonDTO = fhirResource => {
  let periodEnd = _get(fhirResource, 'period.end');
  periodEnd = periodEnd ? new Date(periodEnd).toLocaleString() : ' - ';

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart
    ? new Date(_get(fhirResource, 'period.start')).toLocaleString()
    : ' - ';
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
  periodEnd = periodEnd ? <DateType fhirData={periodEnd} /> : ' - ';

  let periodStart = _get(fhirResource, 'period.start');
  periodStart = periodStart ? <DateType fhirData={periodStart} /> : ' - ';
  const resourceClass = _get(fhirResource, 'class.display');
  const resourceStatus = _get(fhirResource, 'status');
  const participant = _get(fhirResource, 'participant', []).map(item => {
    let periodStart = _get(item, 'period.start');
    if (periodStart) {
      periodStart = <DateType fhirData={periodStart} />;
    }
    return {
      display: ' - ',
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
    <div>
      <div className="container">
        <div className="row">
          <div className=" ">
            <div>
              <h4>{locationDisplay}</h4>
              <div className="row">
                <div className="col-sm-3">
                  <span className="text-muted">
                    <small className="text-uppercase">
                      <strong>Start Date </strong>
                    </small>
                  </span>
                </div>
                <div className="col-sm-9">{periodStart}</div>
                <div className="col-sm-3">
                  <span className="text-muted">
                    <small className="text-uppercase">
                      <strong>End Date</strong>
                    </small>
                  </span>
                </div>
                <div className="col-sm-9">{periodEnd}</div>
                <div className="col-sm-3">
                  <span className="text-muted">
                    <small className="text-uppercase">
                      <strong>Class</strong>
                    </small>
                  </span>
                </div>
                <div className="col-sm-9">{resourceClass}</div>
                <div className="col-sm-3">
                  <span className="text-muted">
                    <small className="text-uppercase">
                      <strong>Status</strong>
                    </small>
                  </span>
                </div>
                <div className="col-sm-9">{resourceStatus}</div>
              </div>
            </div>
          </div>
        </div>
        {hasParticipant && (
          <EncounterParticipants allParticipant={participant} />
        )}
      </div>
    </div>
  );
};

Encounter.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.string.isRequired,
};

export default Encounter;
