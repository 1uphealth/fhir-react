import {
  MissingValue,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  ValueSection,
} from '../../ui';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import React from 'react';

const Diagnosis = ({ diagnosis }) => {
  return (
    <ValueSection label="Diagnosis" data-testid="diagnosis" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Diagnosis</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Package code</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {diagnosis.map((diagnosis, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="diagnosis.diagnosis" className="col-md-4">
                {diagnosis.coding ? (
                  <Coding fhirData={diagnosis.coding} />
                ) : diagnosis.refrence ? (
                  <Reference fhirData={diagnosis.reference} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="diagnosis.type" className="col-md-4">
                {diagnosis.typeCoding ? (
                  <Coding fhirData={diagnosis.typeCoding} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell
                data-testid="diagnosis.packageCode"
                className="col-md-4"
              >
                {diagnosis.packageCodeCoding ? (
                  <Coding fhirData={diagnosis.packageCodeCoding} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default Diagnosis;
