import React from 'react';

import DateType from '../../datatypes/Date';

const CareTeamParticipant = props => {
  const { participant } = props;

  return (
    <div className="row">
      <div className="col-sm-2" data-testid="participant.role">
        {participant.role}
      </div>
      <div className="col-sm-2" data-testid="participant.display">
        {participant.display}
      </div>
      <div className="col-sm-2" data-testid="participant.periodStart">
        {participant.periodStart ? (
          <DateType fhirData={participant.periodStart} />
        ) : (
          '-'
        )}
      </div>
      <div className="col-sm-2" data-testid="participant.periodEnd">
        {participant.periodEnd ? (
          <DateType fhirData={participant.periodEnd} />
        ) : (
          '-'
        )}
      </div>
    </div>
  );
};

export default CareTeamParticipant;
