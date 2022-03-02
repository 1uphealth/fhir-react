import {
  MissingValue,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  ValueSection,
} from '../../ui';
import Reference from '../../datatypes/Reference';
import React from 'react';

const Insurance = ({ insurance }) => {
  return (
    <ValueSection label="Insurance" data-testid="insurance" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Coverage</TableHeader>
            <TableHeader>Business Arrangement</TableHeader>
            <TableHeader>Claim Response</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {insurance.map((insurance, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="insurance.coverage" className="col-md-4">
                <Reference fhirData={insurance.coverage} />
                {insurance.focal && ' (focal)'}
              </TableCell>
              <TableCell
                data-testid="insurance.businessArrangement"
                className="col-md-4"
              >
                {insurance.businessArrangement ? (
                  insurance.businessArrangement
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell
                data-testid="insurance.claimResponse"
                className="col-md-4"
              >
                {insurance.claimResponse ? (
                  <Reference fhirData={insurance.claimResponse} />
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

export default Insurance;
