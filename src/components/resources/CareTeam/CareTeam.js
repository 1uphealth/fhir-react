import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import DateType from '../../datatypes/Date';
import CareTeamParticipants from './CareTeamParticipants';

const resourceDTO = fhirResource => {
  const name = _get(fhirResource, 'name');
  const status = _get(fhirResource, 'status');
  const periodStart = _get(fhirResource, 'period.start');
  const periodEnd = _get(fhirResource, 'period.end');

  const participants = _get(fhirResource, 'participant', []).map(item => {
    const display = _get(item, 'member.display');
    const role = _get(item, 'role.text');
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
  };
};

const CareTeam = props => {
  const { fhirResource } = props;
  const { name, status, periodStart, periodEnd, participants } = resourceDTO(
    fhirResource,
  );
  const hasParticipants = participants.length > 0;

  return (
    <div>
      <div>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {name} {status}
        </h4>
        {status && (
          <span className="text-muted" data-testid="status">
            {status}
          </span>
        )}
      </div>
      <div>
        <div>
          <small className="text-muted text-uppercase">
            <strong>Care Period Start</strong>
          </small>
          <div data-testid="periodStart">
            {periodStart ? <DateType fhirData={periodStart} /> : '-'}
          </div>
        </div>
        <div>
          <small className="text-muted text-uppercase">
            <strong>Care Period End</strong>
          </small>
          <div data-testid="periodEnd">
            {periodEnd ? <DateType fhirData={periodEnd} /> : '-'}
          </div>
        </div>
        {hasParticipants && (
          <CareTeamParticipants participants={participants} />
        )}
      </div>
    </div>
  );
};

CareTeam.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default CareTeam;
