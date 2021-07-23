import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { getExtension } from './utils';

import {
  Root,
  Header,
  Title,
  Value,
  Body,
  ValueSection,
  Badge,
} from '../../ui';
import Date from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import Entries from './Entries';
import Identifier from '../../datatypes/Identifier/Identifier';
import CodeableConcept from '../../datatypes/CodeableConcept';
import DrugTierDefinitionExtension from './DrugTierDefinitionExtension';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const identifier = _get(fhirResource, 'identifier');
  const status = String(_get(fhirResource, 'status'));
  const mode = _get(fhirResource, 'mode');
  const title = _get(fhirResource, 'title');
  const code = _get(fhirResource, 'code');
  const subject = _get(fhirResource, 'subject');
  const date = _get(fhirResource, 'date');
  const source = _get(fhirResource, 'source');
  const entry = _get(fhirResource, 'entry');

  return {
    id,
    identifier,
    status,
    mode,
    title,
    code,
    subject,
    date,
    source,
    entry,
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
      return {
        ...commonDTO(fhirResource),
      };
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

const List = props => {
  const { fhirResource, fhirVersion, withDaVinciPDex = false } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource, withDaVinciPDex);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="List" />;
  }

  const {
    id,
    identifier,
    status,
    mode,
    title,
    code,
    subject,
    date,
    source,
    entry,
    hasExtensions,
    usdfDrugTierDefinition,
    usdfNetwork,
    usdfSummaryURL,
    usdfFormularyURL,
    usdfEmailPlanContact,
    usdfMarketingURL,
    usdfPlanIDType,
  } = fhirResourceData;

  return (
    <Root name="List">
      <Header>
        <Title>
          {title || 'List'} {id && id}{' '}
          {status && <Badge data-testid="status">{status}</Badge>}
        </Title>
      </Header>
      <Body>
        {identifier && (
          <Value label="Identifier" data-testid="identifier">
            {identifier.map((id, index) => (
              <div key={`identifier-${index}`}>
                <Identifier fhirData={id} />
              </div>
            ))}
          </Value>
        )}
        {mode && (
          <Value label="Mode" data-testid="mode">
            {mode}
          </Value>
        )}
        {code && (
          <Value label="code" data-testid="code">
            <CodeableConcept fhirData={code} />
          </Value>
        )}
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {date && (
          <Value label="Date" data-testid="date">
            <Date fhirData={date} />
          </Value>
        )}
        {source && (
          <Value label="Source" data-testid="source">
            <Reference fhirData={source} />
          </Value>
        )}
        {entry && <Entries fhirData={entry} />}

        {hasExtensions && (
          <ValueSection label="USDF extensions" data-testid="usdfExtensions">
            {usdfDrugTierDefinition && (
              <DrugTierDefinitionExtension
                drugTierDefinitionExtension={usdfDrugTierDefinition}
                data-testid="usdfDrugTierDefinition"
              />
            )}
            {usdfNetwork && (
              <Value label="Network" data-testid="usdfNetwork">
                {usdfNetwork}
              </Value>
            )}
            {usdfSummaryURL && (
              <Value label="Summary URL" data-testid="usdfSummaryURL">
                {usdfSummaryURL}
              </Value>
            )}
            {usdfFormularyURL && (
              <Value label="Formulary URL" data-testid="usdfFormularyURL">
                {usdfFormularyURL}
              </Value>
            )}
            {usdfEmailPlanContact && (
              <Value
                label="Email Plan Contact"
                data-testid="usdfEmailPlanContact"
              >
                {usdfEmailPlanContact}
              </Value>
            )}
            {usdfMarketingURL && (
              <Value label="Marketing URL" data-testid="usdfMarketingURL">
                {usdfMarketingURL}
              </Value>
            )}
            {usdfPlanIDType && (
              <Value label="Plan ID Type" data-testid="usdfPlanIDType">
                {usdfPlanIDType}
              </Value>
            )}
          </ValueSection>
        )}
      </Body>
    </Root>
  );
};

List.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
  withDaVinciPDex: PropTypes.bool,
};

export default List;
