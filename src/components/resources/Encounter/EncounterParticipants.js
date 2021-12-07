import React from 'react';
import EachParticipant from './EachParticipant';
import { ValueSection, Table, TableHeader, TableRow } from '../../ui';
const EncounterParticipants = props => {
  const allParticipant = props.allParticipant.map((eachParticipant, i) => (
    <EachParticipant
      key={`Participant-${i}`}
      eachParticipant={eachParticipant}
    />
  ));
  return (
    <ValueSection label="Participants" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Role</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Date</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">{allParticipant}</tbody>
      </Table>
    </ValueSection>
  );
};

export default EncounterParticipants;
