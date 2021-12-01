import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import fhirVersions from '../fhirResourceVersions';
import {
  Root,
  Header,
  Badge,
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
import { isNotEmptyArray } from '../../../utils';
import Accordion from '../../containers/Accordion';

const prepareParticipantData = data => {
  let participantPatient = [];
  let participantPractitioner = [];
  let participantLocation = [];
  if (Array.isArray(data)) {
    data.forEach((item, i) => {
      if (_get(item, 'actor.reference', '').includes('Patient')) {
        participantPatient.push(
          <div key={`item-${i}`}>
            <Reference fhirData={item.actor} />
          </div>,
        );
      } else if (_get(item, 'actor.reference', '').includes('Practitioner')) {
        participantPractitioner.push(
          <div key={`item-${i}`}>
            <Reference fhirData={item.actor} />
          </div>,
        );
      } else if (_get(item, 'actor.display', '')) {
        participantLocation.push(
          <div key={`item-${i}`}>
            <Reference fhirData={item.actor} />
          </div>,
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

const commonDTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  const status = _get(fhirResource, 'status');
  const start = _get(fhirResource, 'start');
  const typeCoding = _get(fhirResource, 'type.coding');
  const comment = _get(fhirResource, 'comment');
  const participant = _get(fhirResource, 'participant');
  const {
    participantPatient,
    participantPractitioner,
    participantLocation,
  } = prepareParticipantData(participant);
  const minutesDuration = _get(fhirResource, 'minutesDuration');
  const reason = _get(fhirResource, 'reason', []);

  return {
    description,
    status,
    start,
    typeCoding,
    comment,
    participant,
    participantPatient,
    participantPractitioner,
    participantLocation,
    minutesDuration,
    reason,
  };
};

const stu3DTO = fhirResource => {
  const serviceCategory = _get(fhirResource, 'serviceCategory', []);
  const typeCoding = _get(fhirResource, 'appointmentType.coding');
  return {
    serviceCategory,
    typeCoding,
  };
};

const r4DTO = fhirResource => {
  const reason = _get(fhirResource, 'reasonCode', []);
  const cancelationReason = _get(fhirResource, 'cancelationReason', []);
  const serviceCategory = _get(fhirResource, 'serviceCategory', []);
  const typeCoding = _get(fhirResource, 'appointmentType.coding');

  return {
    reason,
    cancelationReason,
    serviceCategory,
    typeCoding,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Appointment = props => {
  const { fhirResource, fhirVersion } = props;
  const {
    description,
    status,
    start,
    typeCoding,
    comment,
    participant,
    participantPatient,
    participantPractitioner,
    participantLocation,
    minutesDuration,
    reason,
    cancelationReason,
    serviceCategory,
  } = resourceDTO(fhirVersion, fhirResource);

  const tableData = [
    {
      label: 'Type',
      testId: 'type',
      data:
        isNotEmptyArray(typeCoding) &&
        typeCoding.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: isNotEmptyArray(typeCoding),
    },
    {
      label: 'Duration [min]',
      testId: 'minutesDuration',
      data: minutesDuration,
      status: minutesDuration,
    },
    {
      label: 'Reason',
      testId: 'reason',
      data: isNotEmptyArray(reason) && <CodeableConcept fhirData={reason} />,
      status: isNotEmptyArray(reason),
    },
    {
      label: 'Cancelation Reason',
      testId: 'cancelationReason',
      data: isNotEmptyArray(cancelationReason) && (
        <CodeableConcept fhirData={cancelationReason} />
      ),
      status: isNotEmptyArray(cancelationReason),
    },
    {
      label: 'Service Category',
      testId: 'serviceCategory',
      data: isNotEmptyArray(serviceCategory) && (
        <CodeableConcept fhirData={serviceCategory} />
      ),
      status: isNotEmptyArray(serviceCategory),
    },
  ];

  return (
    <Root name="Appointment">
      <Accordion
        headerContent={
          <Header
            resourceName={fhirResource.resourceName}
            additionalContent={
              start && (
                <Value label="Start date" data-testid="headerStartDate">
                  <Date className="ms-2" fhirData={start} />
                </Value>
              )
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={description}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {isNotEmptyArray(participant) && (
              <ValueSection label="Participant" data-testid="participant">
                <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Patient</TableHeader>
                      <TableHeader>Practitioner</TableHeader>
                      <TableHeader>Other</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody className="border-top-0">
                    <TableRow>
                      <TableCell>{participantPatient}</TableCell>
                      <TableCell>{participantPractitioner}</TableCell>
                      <TableCell>{participantLocation}</TableCell>
                    </TableRow>
                  </tbody>
                </Table>
              </ValueSection>
            )}
            {comment && (
              <ValueSection label="Comment" data-testid="comment">
                {comment}
              </ValueSection>
            )}
          </Body>
        }
      />
    </Root>
  );
};

Appointment.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default Appointment;
