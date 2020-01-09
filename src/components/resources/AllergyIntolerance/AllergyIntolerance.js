import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import Date from '../../datatypes/Date';
import Annotation from '../../datatypes/Annotation';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';

const commonDTO = fhirResource => {
  const hasReaction = _get(fhirResource, 'reaction.0.manifestation');
  const reaction = _get(fhirResource, 'reaction', []);
  const asserter = _get(fhirResource, 'asserter');

  return {
    hasReaction,
    reaction,
    asserter,
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

  return { title, status, recordedDate, substanceCoding, hasSubstanceCoding };
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

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
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
  } = fhirResourceData;

  return (
    <Root name="AllergyIntolerance">
      <Header>
        <Title>{title}</Title>
        <Badge data-testid="status">{status}</Badge>
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
        {hasReaction && (
          <Value label="Manifestation" data-testid="manifestation">
            {reaction.map((reaction, i) => {
              const manifestations = _get(reaction, 'manifestation', []);
              return manifestations.map((manifestation, j) => {
                const coding = _get(manifestation, 'coding', []);
                return coding.map((item, c) => {
                  const severity = _get(item, 'severity');
                  return (
                    <div key={`item-${i}${j}${c}`}>
                      <Coding fhirData={item} />
                      {severity && <span>{severity} severity</span>}
                    </div>
                  );
                });
              });
            })}
          </Value>
        )}
        {asserter && (
          <Value label="Asserted by" data-testid="asserter">
            <Reference fhirData={asserter} />
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
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']),
};

export default AllergyIntolerance;
