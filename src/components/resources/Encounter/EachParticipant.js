import React from 'react';

const EachParticipant = props => {
  const { eachParticipant } = props;
  return (
    <div className="row">
      <div className="col-sm-3" data-testid="display">
        {eachParticipant.display}
      </div>
      <div className="col-sm-3" data-testid="text">
        {eachParticipant.text}
      </div>
      <div className="col-sm-6" data-testid="periodStart">
        {eachParticipant.periodStart}
      </div>
    </div>
  );
};

export default EachParticipant;
