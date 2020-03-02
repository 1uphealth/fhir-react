import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import Date from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import Annotation from '../../datatypes/Annotation';
import Reference from '../../datatypes/Reference';
import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
  ValueSection,
} from '../../ui';

const MedicationDetails = props => {
  const { medication, expiration, ingredient } = props;
  return (
    <div>
      <h5>{medication} </h5>
      <Value label="Expiration date">{expiration}</Value>
      {ingredient && (
        <Value label="Ingredient">
          <ul>
            {ingredient.map((item, i) => (
              <li key={`item-${i}`}>
                {_get(item, 'itemCodeableConcept.coding.0.display', '')}
              </li>
            ))}
          </ul>
        </Value>
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
  const medicationReference = _get(fhirResource, 'medicationReference');
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
    medicationReference,
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
    medicationReference,
  } = fhirResourceData;

  return (
    <Root name="MedicationStatement">
      <Header>
        <Title>{title}</Title>
        <Badge data-testid="hasStatus">{status}</Badge>
        {hasEffectivePeriod && (
          <BadgeSecondary data-testid="hasEffectivePeriod">
            from <Date fhirData={statusDesc.from} /> {'to '}
            <Date fhirData={statusDesc.to} />
            <span>{reported}</span>
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {hasMedications && (
          <Value label="Medications">
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
          </Value>
        )}
        {medicationReference && (
          <Value label="Medication Reference" data-testid="medicationReference">
            <Reference fhirData={medicationReference} />
          </Value>
        )}
        {hasReasonCode && (
          <Value label="Reason" data-testid="hasReasonCode">
            <ul>
              {reasonCode.map((item, i) => {
                const display = _get(item, 'coding.0.display');
                if (display) {
                  return <li key={`item-${i}`}>{display}</li>;
                }
                return null;
              })}
            </ul>
          </Value>
        )}
        {hasDosage && (
          <ValueSection label="Dosage" data-testid="dosage">
            {fhirResource.dosage.map((dosage, i) => {
              const text = _get(dosage, 'text');
              const additionalInstructionText = _get(
                dosage,
                'additionalInstruction[0].text',
              );
              const route =
                _get(dosage, 'route.coding[0].display') ||
                `${_get(dosage, 'route.text')} ${_get(dosage, 'text')}`;
              return (
                <div key={`dosage-${i}`}>
                  <Value label="Instructions" data-testid="dosageInstruction">
                    {text}
                  </Value>
                  {additionalInstructionText && (
                    <Value label="Additional Instruction">
                      {additionalInstructionText}
                    </Value>
                  )}
                  {route && <Value label="Route">{route}</Value>}
                </div>
              );
            })}
          </ValueSection>
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

MedicationStatement.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationStatement;
