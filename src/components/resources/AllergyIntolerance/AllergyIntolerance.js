import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import Date from '../../datatypes/Date';
import Annotation from '../../datatypes/Annotation';

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
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>{' '}
        (<span data-testid="status">{status}</span>
        <span className="text-muted" data-testid="recordedDate">
          {recordedDate && (
            <>
              , recorded on <Date fhirData={recordedDate} />
            </>
          )}
        </span>
        )
      </div>
      <div className="container pl-0 pr-0">
        {hasSubstanceCoding && (
          <div className="row pl-0 pr-0" data-testid="substance">
            {substanceCoding.map((item, i) => (
              <div key={`item-${i}`} className="col-12">
                <Coding fhirData={item} />
              </div>
            ))}
          </div>
        )}
        <div className="row pl-0 pr-0">
          {hasReaction && (
            <>
              <div className="col-12">
                <small className="text-muted text-uppercase">
                  <strong>Manifestation</strong>
                </small>
              </div>
              <div className="col-12" data-testid="manifestation">
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
              </div>
            </>
          )}
        </div>
        {asserter && (
          <div className="row">
            <div className="col-12-sm">
              <div>
                <small className="text-muted text-uppercase">
                  <strong>Asserted by:</strong>
                </small>{' '}
                {<Reference fhirData={asserter} />}
              </div>
            </div>
          </div>
        )}
        {hasNote && (
          <div data-testid="hasNote">
            <label className="sb-heading">Notes</label>
            <Annotation fhirData={note} />
          </div>
        )}
      </div>
    </div>
  );
};

AllergyIntolerance.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']),
};

export default AllergyIntolerance;
