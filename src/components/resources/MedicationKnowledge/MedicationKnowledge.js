import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { getExtension, isBoolean } from './utils';

import {
  Root,
  Header,
  Title,
  Value,
  Body,
  Badge,
  ValueSection,
} from '../../ui';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const code = _get(fhirResource, 'code');
  const status = _get(fhirResource, 'status');
  const manufacturer = _get(fhirResource, 'manufacturer');
  const amount = _get(fhirResource, 'amount');
  const synonym = _get(fhirResource, 'synonym');

  return {
    id,
    code,
    status,
    manufacturer,
    amount,
    synonym,
  };
};

const daVinciPDex = fhirResource => {
  const extension = _get(fhirResource, 'extension', []);
  const hasExtensions = extension.length > 0;

  if (hasExtensions) {
    const usdfPriorAuthorization = _get(
      getExtension('usdf-PriorAuthorization-extension', extension),
      'valueBoolean',
    );
    const usdfStepTherapyLimit = _get(
      getExtension('usdf-StepTherapyLimit-extension', extension),
      'valueBoolean',
    );
    const usdfQuantityLimit = _get(
      getExtension('usdf-QuantityLimit-extension', extension),
      'valueBoolean',
    );
    const usdfPlanID = _get(
      getExtension('usdf-PlanID-extension', extension),
      'valueString',
    );
    const usdfDrugTierID = _get(
      getExtension('usdf-DrugTierID-extension', extension),
      'valueCodeableConcept',
    );

    return {
      hasExtensions,
      usdfPriorAuthorization,
      usdfStepTherapyLimit,
      usdfQuantityLimit,
      usdfPlanID,
      usdfDrugTierID,
    };
  }

  return {
    hasExtensions,
  };
};

const resourceDTO = (fhirVersion, fhirResource, withDaVinciPDex) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2:
    case fhirVersions.STU3: {
      throw Error(
        `${fhirVersion} FHIR version is not supported for this resource.`,
      );
    }
    case fhirVersions.R4: {
      const dto = {
        ...commonDTO(fhirResource),
      };

      if (withDaVinciPDex) {
        return {
          ...dto,
          ...daVinciPDex(fhirResource),
        };
      }

      return dto;
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const MedicationKnowledge = props => {
  const { fhirResource, fhirVersion, withDaVinciPDex = false } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource, withDaVinciPDex);
  } catch (error) {
    console.warn(error.message);
    return (
      <UnhandledResourceDataStructure resourceName="MedicationKnowledge" />
    );
  }

  const {
    id,
    code,
    status,
    manufacturer,
    amount,
    synonym,
    hasExtensions,
    usdfPriorAuthorization,
    usdfStepTherapyLimit,
    usdfQuantityLimit,
    usdfPlanID,
    usdfDrugTierID,
  } = fhirResourceData;

  let amountDisplay = '';
  if (amount && amount.value) {
    amountDisplay = amount.value;
    amountDisplay = amount.unit
      ? `${amountDisplay} ${amount.unit}`
      : amountDisplay;
  }

  return (
    <Root name="MedicationKnowledge">
      <Header>
        <Title>
          {id ? `Medication knowledge ID: ${id}` : 'Medication knowledge'}{' '}
          {status && <Badge>{status}</Badge>}
        </Title>
      </Header>
      <Body>
        {code && (
          <Value label="Code" data-testid="code">
            <CodeableConcept fhirData={code} />
          </Value>
        )}
        {manufacturer && (
          <Value label="Manufacturer" data-testid="manufacturer">
            <Reference fhirData={manufacturer} />
          </Value>
        )}
        {amountDisplay && (
          <Value label="Amount" data-testid="amount">
            {amountDisplay}
          </Value>
        )}
        {synonym && (
          <Value label="Synonym" data-testid="synonym">
            {synonym}
          </Value>
        )}

        {hasExtensions && (
          <ValueSection label="USDF extensions" data-testid="usdfExtensions">
            {isBoolean(usdfPriorAuthorization) && (
              <Value
                label="Prior Authorization"
                data-testid="usdfPriorAuthorization"
              >
                {usdfPriorAuthorization === true ? 'yes' : 'no'}
              </Value>
            )}
            {isBoolean(usdfStepTherapyLimit) && (
              <Value
                label="Step Therapy Limit"
                data-testid="usdfStepTherapyLimit"
              >
                {usdfStepTherapyLimit === true ? 'yes' : 'no'}
              </Value>
            )}
            {isBoolean(usdfQuantityLimit) && (
              <Value label="Quantity Limit" data-testid="usdfQuantityLimit">
                {usdfQuantityLimit === true ? 'yes' : 'no'}
              </Value>
            )}
            {usdfPlanID && (
              <Value label="Plan ID" data-testid="usdfPlanID">
                {usdfPlanID}
              </Value>
            )}
            {usdfDrugTierID && (
              <Value label="Drug Tier ID" data-testid="usdfDrugTierID">
                <CodeableConcept fhirData={usdfDrugTierID} />
              </Value>
            )}
          </ValueSection>
        )}
      </Body>
    </Root>
  );
};

MedicationKnowledge.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.R4]).isRequired,
  withDaVinciPDex: PropTypes.bool,
};

export default MedicationKnowledge;
