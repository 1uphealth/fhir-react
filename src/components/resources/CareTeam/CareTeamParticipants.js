import React from 'react';

import CareTeamParticipant from './CareTeamParticipant';

const CareTeamParticipants = props => {
  const { participants } = props;
  const allParticipants = participants.map((participant, i) => (
    <CareTeamParticipant key={`Participant-${i}`} participant={participant} />
  ));
  return (
    <div className="container-fluid">
      <div className="row">
        <span>
          <small className="text-uppercase text-muted">
            <strong>Participants</strong>
          </small>
        </span>
      </div>
      <div className="row">
        <div className="col-sm-2">
          <small className="text-uppercase text-muted">
            <strong>Role</strong>
          </small>
        </div>
        <div className="col-sm-2">
          <small className="text-uppercase text-muted">
            <strong>Name</strong>
          </small>
        </div>
        <div className="col-sm-2">
          <small className="text-uppercase text-muted">
            <strong>Start</strong>
          </small>
        </div>
        <div className="col-sm-2">
          <small className="text-uppercase text-muted">
            <strong>End</strong>
          </small>
        </div>
      </div>
      {allParticipants}
    </div>
  );
};

export default CareTeamParticipants;
