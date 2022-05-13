import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { getExtension, isBoolean } from './utils';

import {
  Root,
  Header,
  Body,
  Badge,
  ValueSection,
  ValueSectionItem,
} from '../../ui';
import Reference from '../../datatypes/Reference';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Accordion from '../../containers/Accordion';

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

const MedicationKnowledge = ({
  fhirResource,
  fhirVersion,
  withDaVinciPDex = false,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
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

  const tableData = [
    {
      label: 'Code',
      testId: 'code',
      data: code && <CodeableConcept fhirData={code} isCursive />,
      status: code,
    },
    {
      label: 'Manufacturer',
      testId: 'manufacturer',
      data: manufacturer && <Reference fhirData={manufacturer} />,
      status: manufacturer,
    },
    {
      label: 'Amount',
      testId: 'amount',
      data: amountDisplay,
      status: amountDisplay,
    },
    {
      label: 'Synonym',
      testId: 'synonym',
      data: synonym,
      status: synonym,
    },
  ];

  const usdfExtensionsData = [
    {
      label: 'Prior Authorization',
      testId: 'usdfPriorAuthorization',
      data:
        isBoolean(usdfPriorAuthorization) && usdfPriorAuthorization === true
          ? 'yes'
          : 'no',
      status: isBoolean(usdfPriorAuthorization),
    },
    {
      label: 'Step Therapy Limit',
      testId: 'usdfStepTherapyLimit',
      data:
        isBoolean(usdfStepTherapyLimit) && usdfStepTherapyLimit === true
          ? 'yes'
          : 'no',
      status: isBoolean(usdfStepTherapyLimit),
    },
    {
      label: 'Quantity Limit',
      testId: 'usdfQuantityLimit',
      data:
        isBoolean(usdfQuantityLimit) && usdfQuantityLimit === true
          ? 'yes'
          : 'no',
      status: isBoolean(usdfQuantityLimit),
    },
    {
      label: 'Plan ID',
      testId: 'usdfPlanID',
      data: usdfPlanID,
      status: usdfPlanID,
    },
    {
      label: 'Drug Tier ID',
      testId: 'usdfDrugTierID',
      data: usdfDrugTierID && <CodeableConcept fhirData={usdfDrugTierID} />,
      status: usdfDrugTierID,
    },
  ];

  return (
    <Root name="MedicationKnowledge">
      <Accordion
        headerContent={
          <Header
            resourceName="MedicationKnowledge"
            title={
              id
                ? `Medication knowledge ID: ${id} `
                : 'MedicationOrder knowledge '
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {hasExtensions && (
              <ValueSection
                label="USDF extensions"
                data-testid="usdfExtensions"
                marginTop
              >
                {usdfExtensionsData.map(
                  (item, index) =>
                    item.status && (
                      <ValueSectionItem
                        key={`usdf-extension-item-${index}`}
                        label={item.label}
                        data-testid={item.testId}
                      >
                        {item.data}
                      </ValueSectionItem>
                    ),
                )}
              </ValueSection>
            )}
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

MedicationKnowledge.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.R4]).isRequired,
  withDaVinciPDex: PropTypes.bool,
};

export default MedicationKnowledge;
