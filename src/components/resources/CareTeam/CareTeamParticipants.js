import React from 'react';

import CareTeamParticipant from './CareTeamParticipant';

import { ValueSection, Table, TableRow, TableHeader } from '../../ui';

const CareTeamParticipants = props => {
  const { participants } = props;
  const allParticipants = participants.map((participant, i) => (
    <CareTeamParticipant key={`Participant-${i}`} participant={participant} />
  ));
  return (
    <ValueSection label="Participants">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Role</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Start</TableHeader>
            <TableHeader>End</TableHeader>
          </TableRow>
        </thead>
        <tbody>{allParticipants}</tbody>
      </Table>
    </ValueSection>
  );
};

export default CareTeamParticipants;
