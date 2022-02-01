import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '../../containers/Accordion/Accordion';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import Annotation from '../../datatypes/Annotation';

import _get from 'lodash/get';
import { Root, Header, Badge, Body } from '../../ui';
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
  const { fhirResource, fhirVersion, fhirIcons } = props;
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

  const tableData = [
    {
      label: 'Patient',
      testId: 'patient',
      data: patient && <Reference fhirData={patient} />,
      status: patient,
    },
    {
      label: 'Relationship',
      testId: 'hasRelationship',
      data:
        hasRelationship &&
        relationship.map((item, i) => (
          <Coding key={`relationship-item-${i}`} fhirData={item} />
        )),
      status: hasRelationship,
    },
    {
      label: 'Note',
      testId: 'noteText',
      data: hasNotes && <Annotation fhirData={notes} />,
      status: hasNotes,
    },
  ];

  return (
    <Root name="FamilyMemberHistory">
      <Accordion
        headerContent={
          <Header
            resourceName="FamilyMemberHistory"
            additionalContent={
              date && (
                <>
                  <span className="me-2">On</span>
                  <Date fhirData={date} />
                </>
              )
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
            title={title}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

FamilyMemberHistory.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default FamilyMemberHistory;
