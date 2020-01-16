import React from 'react';
import PropTypes from 'prop-types';

import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import Annotation from '../../datatypes/Annotation';

import _get from 'lodash/get';
import {
  Root,
  Header,
  Title,
  BadgeSecondary,
  Badge,
  Body,
  Value,
} from '../../ui';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import Date from '../../datatypes/Date';

const commonDTO = fhirResource => {
  const title =
    _get(fhirResource, 'condition[0].code.text') ||
    _get(fhirResource, 'condition[0].code.coding[0].display', '');

  const date = _get(fhirResource, 'date');
  const status = _get(fhirResource, 'status');
  const relationship = _get(fhirResource, 'relationship.coding', []);
  const hasRelationship = relationship.length > 0;

  const patient = _get(fhirResource, 'patient');
  return {
    title,
    date,
    status,
    relationship,
    hasRelationship,
    patient,
  };
};

const dstu2DTO = fhirResource => {
  const notes = [];
  const noteText = _get(fhirResource, 'condition.0.note.text');
  if (noteText) {
    notes.push({ text: noteText });
  }
  const hasNotes = notes.length > 0;
  return { notes, hasNotes };
};

const stu3DTO = fhirResource => {
  const notes = _get(fhirResource, 'condition.0.note', []);

  const hasNotes = notes.length > 0;
  return { notes, hasNotes };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const FamilyMemberHistory = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Encounter" />;
  }
  const {
    title,
    date,
    status,
    relationship,
    hasRelationship,
    patient,
    hasNotes,
    notes,
  } = fhirResourceData;

  return (
    <Root name="FamilyMemberHistory">
      <Header>
        <Title>{title}</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {date && (
          <BadgeSecondary>
            on <Date fhirData={date} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {patient && (
          <Value label="Patient" data-testid="patient">
            <Reference fhirData={patient} />
          </Value>
        )}
        {hasRelationship && (
          <Value label="Relationship" data-testid="hasRelationship">
            {relationship.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {hasNotes && (
          <Value label="Note" data-testid="noteText">
            <Annotation fhirData={notes} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

FamilyMemberHistory.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default FamilyMemberHistory;
