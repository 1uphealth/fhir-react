import React from 'react';
import _get from 'lodash/get';

import {
  ValueSection,
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from '../../ui/index';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';

const CareTeam = ({ fhirData: careTeam = [] }) => {
  return (
    <ValueSection
      label="Team members"
      data-testid="teamMembers"
      className="mt-3"
    >
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Provider</TableHeader>
            <TableHeader /*expand */>Role</TableHeader>
            <TableHeader>Qualification</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {careTeam.map((member, idx) => (
            <TeamMember
              key={idx}
              item={member}
              level={0}
              parentSequences={[]}
            />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const TeamMember = props => {
  const { item: member } = props;
  const sequence = _get(member, 'sequence');
  const provider = _get(member, 'provider');
  const role = _get(member, 'role');
  const qualification = _get(member, 'qualification');

  return (
    <>
      <TableRow>
        <TableCell data-testid="member.sequence">{sequence}</TableCell>
        <TableCell data-testid="member.provider">
          {provider && <Reference fhirData={provider} />}
        </TableCell>
        <TableCell data-testid="member.role">
          {role && <CodeableConcept fhirData={role} />}
        </TableCell>
        <TableCell data-testid="member.qualification">
          {qualification && <CodeableConcept fhirData={qualification} />}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CareTeam;
