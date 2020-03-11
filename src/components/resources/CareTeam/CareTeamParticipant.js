import React from 'react';

import DateType from '../../datatypes/Date';

import { TableRow, TableCell, MissingValue } from '../../ui';

const CareTeamParticipant = props => {
  const { participant } = props;

  return (
    <TableRow>
      <TableCell data-testid="participant.role">
        {participant.role || <MissingValue />}
      </TableCell>
      <TableCell data-testid="participant.display">
        {participant.display}
      </TableCell>
      <TableCell data-testid="participant.periodStart">
        {participant.periodStart ? (
          <DateType fhirData={participant.periodStart} />
        ) : (
          <MissingValue />
        )}
      </TableCell>
      <TableCell data-testid="participant.periodEnd">
        {participant.periodEnd ? (
          <DateType fhirData={participant.periodEnd} />
        ) : (
          <MissingValue />
        )}
      </TableCell>
    </TableRow>
  );
};

export default CareTeamParticipant;
