import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import DateType from '../../datatypes/Date';
import CareTeamParticipants from './CareTeamParticipants';

import {
  Root,
  Header,
  Title,
  Badge,
  Body,
  Value,
  MissingValue,
} from '../../ui';

const resourceDTO = fhirResource => {
  const name = _get(fhirResource, 'name');
  const status = _get(fhirResource, 'status');
  const periodStart = _get(fhirResource, 'period.start');
  const periodEnd = _get(fhirResource, 'period.end');

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
  };
};

const CareTeam = props => {
  const { fhirResource } = props;
  const { name, status, periodStart, periodEnd, participants } = resourceDTO(
    fhirResource,
  );
  const hasParticipants = participants.length > 0;

  return (
    <Root name="CareTeam">
      <Header>
        {name && <Title>{name}</Title>}
        {status && <Badge data-testid="status">{status}</Badge>}
      </Header>
      <Body>
        <Value label="Care Period Start" data-testid="periodStart">
          {periodStart ? <DateType fhirData={periodStart} /> : <MissingValue />}
        </Value>
        <Value label="Care Period End" data-testid="periodEnd">
          {periodEnd ? <DateType fhirData={periodEnd} /> : <MissingValue />}
        </Value>
        {hasParticipants && (
          <CareTeamParticipants participants={participants} />
        )}
      </Body>
    </Root>
  );
};

CareTeam.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default CareTeam;
