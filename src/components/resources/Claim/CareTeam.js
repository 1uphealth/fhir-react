import {
  MissingValue,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  ValueSection,
} from '../../ui';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import React from 'react';

const CareTeam = ({ careTeam }) => {
  return (
    <ValueSection label="Care Team" data-testid="careTeam" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Provider</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Qualification</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {careTeam.map((member, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="careTeam.provider" className="col-md-4">
                <Reference fhirData={member.provider} />
              </TableCell>
              <TableCell data-testid="careTeam.role" className="col-md-4">
                {member.role ? (
                  <Coding fhirData={member.role} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell
                data-testid="careTeam.qualification"
                className="col-md-4"
              >
                {careTeam.qualification ? (
                  <Coding fhirData={member.qualification} />
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

export default CareTeam;
