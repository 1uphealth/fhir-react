import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
  ValueSection,
  Table,
  TableRow,
  TableCell,
  MissingValue,
  TableHeader,
} from '../../ui';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';

const prepareParticipantData = data => {
  // let participantPatient = <MissingValue />;
  let participantPatient = [];
  let participantPractitioner = [];
  let participantLocation = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (_get(item, 'actor.reference', '').includes('Patient')) {
        participantPatient.push(
          <>
            <Reference fhirData={item.actor} />
            <br />
          </>,
        );
      } else if (_get(item, 'actor.reference', '').includes('Practitioner')) {
        participantPractitioner.push(
          <>
            <Reference fhirData={item.actor} />
            <br />
          </>,
        );
      } else if (_get(item, 'actor.display', '')) {
        participantLocation.push(
          <>
            <Reference fhirData={item.actor} />
            <br />
          </>,
        );
      }
    });
  }
  return {
    participantPatient:
      participantPatient.length > 0 ? participantPatient : <MissingValue />,
    participantPractitioner: participantPractitioner.length ? (
      participantPractitioner
    ) : (
      <MissingValue />
    ),
    participantLocation: participantLocation.length ? (
      participantLocation
    ) : (
      <MissingValue />
    ),
  };
};

const Appointment = props => {
  const { fhirResource } = props;
  const description = _get(fhirResource, 'description');
  const status = _get(fhirResource, 'status');
  const start = _get(fhirResource, 'start');
  const typeCoding = _get(fhirResource, 'type.coding');
  const hasTypeCoding = Array.isArray(typeCoding) && typeCoding.length > 0;
  const comment = _get(fhirResource, 'comment');
  const participant = _get(fhirResource, 'participant');
  const hasParticipant = Array.isArray(participant) && participant.length > 0;
  const {
    participantPatient,
    participantPractitioner,
    participantLocation,
  } = prepareParticipantData(participant);
  const minutesDuration = _get(fhirResource, 'minutesDuration');
  const reason = _get(fhirResource, 'reason', []);
  const hasReason = Array.isArray(reason) && reason.length > 0;
  return (
    <Root name="Appointment">
      <Header>
        {description && <Title>{description}</Title>}
        {status && <Badge data-testid="status">{status}</Badge>}
        {start && (
          <BadgeSecondary data-testid="startDate">
            on <Date fhirData={start} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {hasTypeCoding && (
          <Value label="Type" data-testid="type">
            {typeCoding.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {minutesDuration && (
          <Value label="Duration [min]" data-testid="minutesDuration">
            {minutesDuration}
          </Value>
        )}
        {hasReason && (
          <Value label="Reason" data-testid="reason">
            <CodeableConcept fhirData={reason} />
          </Value>
        )}
        {hasParticipant && (
          <ValueSection label="Participant" data-testid="participant">
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Patient</TableHeader>
                  <TableHeader>Practitioner</TableHeader>
                  <TableHeader>Other</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>{participantPatient}</TableCell>
                  <TableCell>{participantPractitioner}</TableCell>
                  <TableCell>{participantLocation}</TableCell>
                </TableRow>
              </tbody>
            </Table>
          </ValueSection>
        )}
        {comment && <Value label="Comment">{comment}</Value>}
      </Body>
    </Root>
  );
};

Appointment.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Appointment;
