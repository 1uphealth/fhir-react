import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import { Root, Header, Title, Value, Body, Badge } from '../../ui';
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
    const usdfDrugTierDefinition = getExtension(
      'usdf-DrugTierDefinition-extension',
      extension,
    );
    const usdfNetwork = _get(
      getExtension('usdf-Network-extension', extension),
      'valueString',
    );
    const usdfSummaryURL = _get(
      getExtension('usdf-SummaryURL-extension', extension),
      'valueString',
    );
    const usdfFormularyURL = _get(
      getExtension('usdf-FormularyURL-extension', extension),
      'valueString',
    );
    const usdfEmailPlanContact = _get(
      getExtension('usdf-EmailPlanContact-extension', extension),
      'valueString',
    );
    const usdfMarketingURL = _get(
      getExtension('usdf-MarketingURL-extension', extension),
      'valueString',
    );
    const usdfPlanIDType = _get(
      getExtension('usdf-PlanIDType-extension', extension),
      'valueString',
    );

    return {
      hasExtensions,
      usdfDrugTierDefinition,
      usdfNetwork,
      usdfSummaryURL,
      usdfFormularyURL,
      usdfEmailPlanContact,
      usdfMarketingURL,
      usdfPlanIDType,
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

      // if (withDaVinciPDex) {
      //   return {
      //     ...dto,
      //     ...daVinciPDex(fhirResource),
      //   };
      // }

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

  const { id, code, status, manufacturer, amount, synonym } = fhirResourceData;

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
          Medication knowledge {id && id} {status && <Badge>{status}</Badge>}
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
