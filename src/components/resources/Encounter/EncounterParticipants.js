import React from 'react';
import EachParticipant from './EachParticipant';

const EncounterParticipants = props => {
  const allParticipant = props.allParticipant.map((eachParticipant, i) => (
    <EachParticipant
      key={`Participant-${i}`}
      eachParticipant={eachParticipant}
    />
  ));
  return (
    <div>
      <div className="row">
        <span>
          <small className="text-uppercase">
            <strong>Participants</strong>
          </small>
        </span>
      </div>
      <div className="row">
        <div className="col-sm-3 ">
          <span className="text-muted">
            <small className="text-uppercase">
              <strong>Role</strong>
            </small>
          </span>
        </div>
        <div className="col-sm-3">
          <span className="text-muted">
            <small className="text-uppercase">
              <strong>Name</strong>
            </small>
          </span>
        </div>
        <div className="col-sm-6">
          <span className="text-muted">
            <small className="text-uppercase">
              <strong>Date</strong>
            </small>
          </span>
        </div>
      </div>
      {allParticipant}
    </div>
  );
};

export default EncounterParticipants;
