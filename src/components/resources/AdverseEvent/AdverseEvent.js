import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Title, Body, Value } from '../../ui';
import Reference from '../../datatypes/Reference';
import Date from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import CodeableConcept from '../../datatypes/CodeableConcept';

const commonDTO = fhirResource => {
  const subject = _get(fhirResource, 'subject');
  const date = _get(fhirResource, 'date');
  const seriousness = _get(fhirResource, 'seriousness', []);

  return {
    subject,
    date,
    seriousness,
  };
};

const stu3DTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  const type = _get(fhirResource, 'type', []);

  return {
    description,
    type,
  };
};

const stu4DTO = fhirResource => {
  const actuality = _get(fhirResource, 'actuality');
  const event = _get(fhirResource, 'event', []);
  return {
    actuality,
    event,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.STU3:
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    case fhirVersions.STU4:
      return {
        ...commonDTO(fhirResource),
        ...stu4DTO(fhirResource),
      };
    default:
      break;
  }
};

const AdverseEvent = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="AllergyIntolerance" />;
  }

  const {
    subject,
    description,
    type,
    date,
    seriousness,
    actuality,
    event,
  } = fhirResourceData;

  return (
    <Root name="AdverseEvent">
      <Header>
        {subject && (
          <Title>
            <Reference fhirData={subject} />
          </Title>
        )}
      </Header>
      <Body>
        {date && (
          <Value label="Date" data-testid="date">
            <Date fhirData={date} />
          </Value>
        )}
        {type && (
          <Value label="Type" data-testid="type">
            <CodeableConcept fhirData={type} />
          </Value>
        )}
        {event && (
          <Value label="Event" data-testid="event">
            <CodeableConcept fhirData={event} />
          </Value>
        )}
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {seriousness && (
          <Value label="Seriousness" data-testid="hasSeriousness">
            <CodeableConcept fhirData={seriousness} />
          </Value>
        )}
        {actuality && (
          <Value label="Actuality" data-testid="actuality">
            {actuality}
          </Value>
        )}
      </Body>
    </Root>
  );
};

AdverseEvent.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3, fhirVersions.STU4])
    .isRequired,
};

export default AdverseEvent;
