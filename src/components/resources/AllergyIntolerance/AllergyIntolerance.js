import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import Date from '../../datatypes/Date';
import Annotation from '../../datatypes/Annotation';
import './AllergyIntolerance.css';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept';

const commonDTO = fhirResource => {
  const hasReaction = _get(fhirResource, 'reaction.0.manifestation');
  const reaction = _get(fhirResource, 'reaction', []);
  const asserter = _get(fhirResource, 'asserter');
  const type = _get(fhirResource, 'type');
  const category = _get(fhirResource, 'category');
  const patient = _get(fhirResource, 'patient');

  return {
    hasReaction,
    reaction,
    asserter,
    type,
    category,
    patient,
  };
};

const dstu2DTO = fhirResource => {
  const title =
    _get(fhirResource, 'substance.coding[0].display') ||
    _get(fhirResource, 'substance.text', '');
  const status = _get(fhirResource, 'status', '');
  const recordedDate = _get(fhirResource, 'recordedDate');
  const substanceCoding = _get(fhirResource, 'substance.coding');
  const hasSubstanceCoding = Array.isArray(substanceCoding);
  const asserter = _get(fhirResource, 'reporter');

  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    asserter,
  };
};
const stu3DTO = fhirResource => {
  const title = _get(fhirResource, 'code.coding.0.display');
  const status = _get(fhirResource, 'verificationStatus');
  const recordedDate = _get(fhirResource, 'assertedDate');
  let substanceCoding = _get(fhirResource, 'reaction', []).filter(item =>
    _get(item, 'substance.coding'),
  );
  substanceCoding = _get(substanceCoding, '0.substance.coding');
  const hasSubstanceCoding =
    Array.isArray(substanceCoding) && substanceCoding.length > 0;
  const note = _get(fhirResource, 'note');
  const hasNote = Array.isArray(note);
  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    note,
    hasNote,
  };
};
const r4DTO = fhirResource => {
  const title = _get(fhirResource, 'code.coding.0.display');
  const status = _get(fhirResource, 'verificationStatus.coding[0].display');
  const recordedDate = _get(fhirResource, 'recordedDate');
  let substanceCoding = _get(fhirResource, 'reaction', []).filter(item =>
    _get(item, 'substance.coding'),
  );
  substanceCoding = _get(substanceCoding, '0.substance.coding');
  const hasSubstanceCoding =
    Array.isArray(substanceCoding) && substanceCoding.length > 0;
  const note = _get(fhirResource, 'note');
  const hasNote = Array.isArray(note);

  return {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    note,
    hasNote,
  };
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

const AllergyIntolerance = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="AllergyIntolerance" />;
  }

  const {
    title,
    status,
    recordedDate,
    substanceCoding,
    hasSubstanceCoding,
    hasReaction,
    reaction,
    asserter,
    hasNote,
    note,
    type,
    category,
    patient,
  } = fhirResourceData;

  return (
    <Root name="AllergyIntolerance">
      <Header>
        <Title>{title}</Title>
        {status && <Badge data-testid="status">{status}</Badge>}
        {recordedDate && (
          <BadgeSecondary data-testid="recordedDate">
            recorded on <Date fhirData={recordedDate} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {hasSubstanceCoding && (
          <Value label="Substance" data-testid="substance">
            {substanceCoding.map((item, i) => (
              <div key={`item-${i}`}>
                <Coding fhirData={item} />
              </div>
            ))}
          </Value>
        )}
        {type && (
          <Value label="Type" data-testid="type">
            {type}
          </Value>
        )}
        {category && (
          <Value label="Category" data-testid="category">
            {category}
          </Value>
        )}
        {patient && (
          <Value label="Patient" data-testid="patient">
            <Reference fhirData={patient} />
          </Value>
        )}
        {asserter && (
          <Value label="Asserted by" data-testid="asserter">
            <Reference fhirData={asserter} />
          </Value>
        )}
        {hasReaction && (
          <Value label="Manifestation" data-testid="manifestation">
            {reaction.map((reaction, i) => {
              const manifestations = _get(reaction, 'manifestation', []);
              const severity = _get(reaction, 'severity');
              return manifestations.map((manifestation, j) => {
                return (
                  <div
                    key={`item-${i}${j}`}
                    className="fhir-resource__AllergyIntolerance__grouping"
                  >
                    <CodeableConcept fhirData={manifestation} />
                    {severity && <BadgeSecondary>{severity}</BadgeSecondary>}
                  </div>
                );
              });
            })}
          </Value>
        )}
        {hasNote && (
          <Value label="Notes" data-testid="hasNote">
            <Annotation fhirData={note} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

AllergyIntolerance.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default AllergyIntolerance;
