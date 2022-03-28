import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import _has from 'lodash/has';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import Accordion from '../../containers/Accordion';
import DatePeriod from '../../datatypes/DatePeriod/DatePeriod';
import MedicationDetails from './MedicationDetails';
import { Root, Header, Badge, Body } from '../../ui';
import MedicationDosage from './MedicationDosage';

const DEFAULT_TITLE = 'Medication Statement';

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
    _get(
      fhirResource,
      'medicationCodeableConcept.coding[0].display',
      DEFAULT_TITLE,
    ),
  );
  return {
    title,
  };
};
const stu3DTO = fhirResource => {
  const title = _get(
    fhirResource,
    'medicationCodeableConcept.text',
    _get(
      fhirResource,
      'medicationCodeableConcept.coding[0].display',
      DEFAULT_TITLE,
    ),
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
    case fhirVersions.R4: {
      // there are not any breaking changes between STU3 and R4 version
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const MedicationStatement = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
}) => {
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
      <Accordion
        headerContent={
          <Header
            icon={fhirIcons}
            resourceName="MedicationStatement"
            badges={status && <Badge data-testid="hasStatus">{status}</Badge>}
            title={title}
            additionalContent={
              hasEffectivePeriod && (
                <>
                  <DatePeriod
                    periodBeginLabel="Start date"
                    periodBeginDate={statusDesc.from}
                    periodBeginTestId="startDate"
                    periodEndLabel="End date"
                    periodEndDate={statusDesc.to}
                    periodEndTestId="endDate"
                  />
                  <span>{reported}</span>
                </>
              )
            }
          />
        }
        bodyContent={
          <Body>
            {hasMedications &&
              contained.map((medication, i) => {
                const hasMedicationDetails = _has(
                  medication,
                  'code.coding[0].display',
                );
                if (hasMedicationDetails) {
                  return (
                    <MedicationDetails
                      key={`item-${i}`}
                      itemNumber={`item-${i}`}
                      medication={_get(medication, 'code.coding[0].display')}
                      expiration={_get(
                        medication,
                        'package.batch[0].expirationDate',
                      )}
                      ingredient={_get(medication, 'ingredient', [])}
                      medicationReference={medicationReference}
                      hasReasonCode={hasReasonCode}
                      reasonCode={reasonCode}
                    />
                  );
                }
                return null;
              })}
            {hasDosage &&
              fhirResource.dosage.map((dosage, i) => {
                return (
                  <MedicationDosage
                    key={`dosage-${i}`}
                    dosage={dosage}
                    hasNote={hasNote}
                    note={note}
                  />
                );
              })}
          </Body>
        }
        onClick={onClick}
      />
    </Root>
  );
};

MedicationStatement.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default MedicationStatement;
