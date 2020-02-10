import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { TableRow, TableCell, MissingValue } from '../../ui';
import Reference from '../../datatypes/Reference';

const EachParticipant = props => {
  const { eachParticipant } = props;
  const { display, reference, text, periodStart } = eachParticipant;
  const isReferenceEmpty = _isEmpty(reference);

  return (
    <TableRow>
      <TableCell data-testid="display">{display}</TableCell>
      <TableCell data-testid="text">
        {!isReferenceEmpty && (
          <Reference fhirData={reference} data-testid="reference" />
        )}
        {isReferenceEmpty && !text ? <MissingValue /> : text}
      </TableCell>
      <TableCell data-testid="periodStart">{periodStart}</TableCell>
    </TableRow>
  );
};

export default EachParticipant;
