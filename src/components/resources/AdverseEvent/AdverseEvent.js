import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Title, Body, Value } from '../../ui';
import Reference from '../../datatypes/Reference';
import Date from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import CodeableConcept, { hasValue } from '../../datatypes/CodeableConcept';
import Accordion from '../../containers/Accordion';
import CodableConcept from '../../datatypes/CodeableConcept';

const commonDTO = fhirResource => {
  const subject = _get(fhirResource, 'subject');
  const date = _get(fhirResource, 'date');
  const seriousness = _get(fhirResource, 'seriousness', []);
  const hasSeriousness = hasValue(seriousness);

  return {
    subject,
    date,
    seriousness,
    hasSeriousness,
  };
};

const stu3DTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  const eventType = _get(fhirResource, 'type', []);
  const hasEventType = hasValue(eventType);

  return {
    description,
    eventType,
    hasEventType,
  };
};

const r4DTO = fhirResource => {
  const actuality = _get(fhirResource, 'actuality');
  const event = _get(fhirResource, 'event', []);
  const hasEvent = hasValue(event);

  return {
    actuality,
    event,
    hasEvent,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.STU3:
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    case fhirVersions.R4:
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    default:
      break;
  }
};

const AdverseEvent = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="AdverseEvent" />;
  }

  const {
    subject,
    description,
    eventType,
    hasEventType,
    date,
    seriousness,
    hasSeriousness,
    actuality,
    event,
    hasEvent,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Date',
      testId: 'date',
      data: date && <Date fhirData={date} />,
      status: date,
    },
    {
      label: 'Type',
      testId: 'type',
      data: hasEventType && <CodeableConcept fhirData={eventType} />,
      status: hasEventType,
    },
    {
      label: 'Event',
      testId: 'event',
      data: hasEvent && <CodeableConcept fhirData={event} />,
      status: hasEvent,
    },
    {
      label: 'Description',
      testId: 'description',
      data: description,
      status: description,
    },
    {
      label: 'Seriousness',
      testId: 'hasSeriousness',
      data: hasSeriousness && <CodeableConcept fhirData={seriousness} />,
      status: hasSeriousness,
    },
    {
      label: 'Actuality',
      testId: 'actuality',
      data: actuality,
      status: actuality,
    },
  ];

  return (
    <Root name="AdverseEvent">
      <Accordion
        headerContent={
          <Header
            resourceName={'AdverseEvent'}
            title={subject && <Reference fhirData={subject} />}
            icon={fhirIcons}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

AdverseEvent.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.STU3, fhirVersions.R4]).isRequired,
};

export default AdverseEvent;
