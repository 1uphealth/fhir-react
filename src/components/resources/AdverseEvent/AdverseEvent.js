import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';
import { Root, Header, Title, Body, Value } from '../../ui';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Encounter from '../../resources/Encounter'; // can i use other resource?
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

// didn't exist in DSTU2 so STU3 is commonDTO or we do diff with STU4?
const commonDTO = fhirResource => {
  const subject = _get(fhirResource, 'subject');
  const description = _get(fhirResource, 'description');
  const typeCoding = _get(fhirResource, 'type.coding', []);
  const hasTypeCoding = Array.isArray(typeCoding) && typeCoding.length > 0;
  const date = _get(fhirResource, 'date');
  const seriousness = _get(fhirResource, 'seriousness.coding', []);
  const hasSeriousness = Array.isArray(seriousness) && seriousness.length > 0;

  return {
    subject,
    description,
    typeCoding,
    hasTypeCoding,
    date,
    seriousness,
    hasSeriousness,
  };
};

const stu4DTO = fhirResource => {
  const actuality = _get(fhirResource, 'actuality');
  const encounter = _get(fhirResource, 'encounter');
  return {
    actuality,
    encounter,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.STU3:
      return {
        ...commonDTO(fhirResource),
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
    typeCoding,
    hasTypeCoding,
    date,
    seriousness,
    hasSeriousness,
    actuality,
    encounter,
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
        {hasTypeCoding && (
          <Value label="Type" data-testid="type">
            {typeCoding.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {hasSeriousness && (
          <Value label="Seriousness" data-testid="hasSeriousness">
            {seriousness.map((item, i) => (
              <Coding key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {encounter && (
          <Value label="Encounter" data-testid="encounter">
            <Encounter fhirResource={fhirResource} fhirVersion={fhirVersion} />
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
};

export default AdverseEvent;
