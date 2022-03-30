import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import { getExtension } from './utils';

import {
  Root,
  Header,
  Body,
  ValueSection,
  Badge,
  ValueSectionItem,
} from '../../ui';
import Date from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import Entries from './Entries';
import Identifier from '../../datatypes/Identifier/Identifier';
import CodeableConcept from '../../datatypes/CodeableConcept';
import DrugTierDefinitionExtension from './DrugTierDefinitionExtension';
import Accordion from '../../containers/Accordion';

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

const List = ({
  fhirResource,
  fhirVersion,
  withDaVinciPDex = false,
  fhirIcons,
  onClick,
}) => {
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

  const tableData = [
    {
      label: 'Identifier',
      testId: 'identifier',
      data:
        identifier &&
        identifier.map((id, index) => (
          <div key={`identifier-${index}`}>
            <Identifier fhirData={id} />
          </div>
        )),
      status: identifier,
    },
    {
      label: 'Mode',
      testId: 'mode',
      data: mode,
      status: mode,
    },
    {
      label: 'code',
      testId: 'code',
      data: code && <CodeableConcept fhirData={code} />,
      status: code,
    },
    {
      label: 'Subject',
      testId: 'subject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Date',
      testId: 'date',
      data: date && <Date fhirData={date} isBlack />,
      status: date,
    },
    {
      label: 'Source',
      testId: 'source',
      data: source && <Reference fhirData={source} />,
      status: source,
    },
  ];

  const extensionData = [
    {
      label: 'Network',
      testId: 'usdfNetwork',
      data: usdfNetwork,
      status: usdfNetwork,
    },
    {
      label: 'Summary URL',
      testId: 'usdfSummaryURL',
      data: usdfSummaryURL,
      status: usdfSummaryURL,
    },
    {
      label: 'Formulary URL',
      testId: 'usdfFormularyURL',
      data: usdfFormularyURL,
      status: usdfFormularyURL,
    },
    {
      label: 'Email Plan Contact',
      testId: 'usdfEmailPlanContact',
      data: usdfEmailPlanContact,
      status: usdfEmailPlanContact,
    },
    {
      label: 'Marketing URL',
      testId: 'usdfMarketingURL',
      data: usdfMarketingURL,
      status: usdfMarketingURL,
    },
    {
      label: 'Plan ID Type',
      testId: 'usdfPlanIDType',
      data: usdfPlanIDType,
      status: usdfPlanIDType,
    },
  ];

  return (
    <Root name="List">
      <Accordion
        headerContent={
          <Header
            resourceName="List"
            title={`${title || 'List'} ${id && id} `}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {entry && <Entries fhirData={entry} />}

            {hasExtensions && (
              <ValueSection
                label="USDF extensions"
                data-testid="usdfExtensions"
                marginTop
              >
                {usdfDrugTierDefinition && (
                  <DrugTierDefinitionExtension
                    drugTierDefinitionExtension={usdfDrugTierDefinition}
                    data-testid="usdfDrugTierDefinition"
                  />
                )}
                <ValueSection marginTop>
                  {extensionData.map(
                    (item, index) =>
                      item.status && (
                        <ValueSectionItem
                          key={`extension-item-${index}`}
                          label={item.label}
                          data-testid={item.testId}
                        >
                          {item.data}
                        </ValueSectionItem>
                      ),
                  )}
                </ValueSection>
              </ValueSection>
            )}
          </Body>
        }
        onClick={onClick}
      />
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
