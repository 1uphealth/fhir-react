import React from 'react';
import { TableRow, TableCell } from '../../ui';

const EachParticipant = props => {
  const { eachParticipant } = props;
  return (
    <TableRow>
      <TableCell data-testid="display">{eachParticipant.display}</TableCell>
      <TableCell data-testid="text">{eachParticipant.text}</TableCell>
      <TableCell data-testid="periodStart">
        {eachParticipant.periodStart}
      </TableCell>
    </TableRow>
  );
};

export default EachParticipant;
