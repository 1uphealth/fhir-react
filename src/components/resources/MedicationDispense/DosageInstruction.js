import { MissingValue, TableCell, TableRow } from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept';
import React from 'react';

const DosageInstruction = props => {
  const empty = <MissingValue />;
  const {
    timing = empty,
    route = empty,
    doseQuantity = empty,
    additionalInstructions = empty,
  } = props.item;
  return (
    <TableRow>
      <TableCell data-testid="dosageTiming">{timing}</TableCell>
      <TableCell data-testid="dosageRoute">{route}</TableCell>
      <TableCell data-testid="dosageQuantity">{doseQuantity}</TableCell>
      <TableCell data-testid="dosageAdditionalInstructions">
        <CodeableConcept fhirData={additionalInstructions} />
      </TableCell>
    </TableRow>
  );
};

export default DosageInstruction;
