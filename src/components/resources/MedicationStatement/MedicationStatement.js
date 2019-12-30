import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import Date from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import Annotation from '../../datatypes/Annotation';

const MedicationDetails = props => {
  const { medication, expiration, ingredient } = props;
  return (
    <div>
      <h5>{medication} </h5>
      <label className="sb-heading">Expiration date:</label> {expiration}
      {ingredient && (
        <div>
          <label className="sb-heading">Ingredient:</label>
          <ul>
            {ingredient.map((item, i) => (
              <li key={`item-${i}`}>
                {_get(item, 'itemCodeableConcept.coding.0.display', '')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const commonDTO = fhirResource => {
  const status = _get(fhirResource, 'status', '');
  const hasEffectivePeriod = _has(fhirResource, 'effectivePeriod');
  const statusDesc = {
    from: _get(fhirResource, 'effectivePeriod.start'),
    to: _get(fhirResource, 'effectivePeriod.end'),
  };
  const reported =
    _get(fhirResource, 'reported') === true ? ' - self reported' : '';

  const contained = _get(fhirResource, 'contained');
  const hasMedications = Array.isArray(contained);
  const hasDosage = Array.isArray(_get(fhirResource, 'dosage'));
  const reasonCode = _get(fhirResource, 'reasonCode');
  const hasReasonCode = Array.isArray(reasonCode);
  return {
    status,
    hasEffectivePeriod,
    statusDesc,
    reported,
    hasMedications,
    hasDosage,
    reasonCode,
    hasReasonCode,
    contained,
  };
};

const dstu2DTO = fhirResource => {
  const title = _get(
    fhirResource,
    'medicationCodeableConcept.text',
    _get(fhirResource, 'medicationCodeableConcept.coding[0].display'),
  );
  return {
    title,
  };
};
const stu3DTO = fhirResource => {
  const title = _get(
    fhirResource,
    'medicationCodeableConcept.text',
    _get(fhirResource, 'medicationCodeableConcept.coding[0].display'),
  );
  const reasonCode = _get(fhirResource, 'reasonCode');
  const hasReasonCode = Array.isArray(reasonCode);
  const note = _get(fhirResource, 'note');
  const hasNote = _has(fhirResource, 'note.0.text');
  return {
    title,
    reasonCode,
    hasReasonCode,
    hasNote,
    note,
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

const MedicationStatement = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return (
      <UnhandledResourceDataStructure resourceName="MedicationStatement" />
    );
  }
  const {
    status,
    hasEffectivePeriod,
    statusDesc,
    reported,
    hasMedications,
    hasDosage,
    hasReasonCode,
    title,
    contained,
    reasonCode,
    hasNote,
    note,
  } = fhirResourceData;

  return (
    <div className="col-xs-8">
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>
        <div data-testid="hasStatus">
          <label className="sb-heading">Status</label>
          {status}
        </div>
        <span className="text-muted" data-testid="hasEffectivePeriod">
          {hasEffectivePeriod && (
            <>
              (from <Date fhirData={statusDesc.from} /> to{' '}
              <Date fhirData={statusDesc.to} />)
            </>
          )}
        </span>
        <span>{reported}</span>
      </div>
      {hasMedications && (
        <div>
          {contained.map((medication, i) => {
            const hasMedicationDetails = _has(
              medication,
              'code.coding[0].display',
            );
            if (hasMedicationDetails) {
              return (
                <MedicationDetails
                  key={`item-${i}`}
                  medication={_get(medication, 'code.coding[0].display')}
                  expiration={_get(
                    medication,
                    'package.batch[0].expirationDate',
                  )}
                  ingredient={_get(medication, 'ingredient', [])}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {hasReasonCode && (
        <div data-testid="hasReasonCode">
          <label className="sb-heading">Reason</label>
          <ul>
            {reasonCode.map((item, i) => {
              const display = _get(item, 'coding.0.display');
              if (display) {
                return <li key={`item-${i}`}>{display}</li>;
              }
              return null;
            })}
          </ul>
        </div>
      )}
      {hasDosage && (
        <div data-testid="dosage">
          <label className="sb-heading">Dosage</label>
          {fhirResource.dosage.map((dosage, i) => {
            const text = _get(dosage, 'text');
            const additionalInstructionText = _get(
              dosage,
              'additionalInstruction[0].text',
            );
            const route = _get(dosage, 'route.coding[0].display');
            return (
              <blockquote key={`dosage-${i}`} className="m-3">
                <p>
                  <b>Dosage Instruction:</b> {text}
                </p>
                {additionalInstructionText && (
                  <p>
                    <b>Additional Instruction:</b>
                    {additionalInstructionText}
                  </p>
                )}
                {route && (
                  <p>
                    <b>Route:</b> {route}
                  </p>
                )}
              </blockquote>
            );
          })}
        </div>
      )}
      {hasNote && (
        <div data-testid="hasNote">
          <label className="sb-heading">Notes</label>
          <Annotation fhirData={note} />
        </div>
      )}
    </div>
  );
};

MedicationStatement.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationStatement;
