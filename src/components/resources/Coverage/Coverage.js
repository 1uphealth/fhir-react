import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import {
  Root,
  Header,
  Title,
  Body,
  Value,
  Badge,
  MissingValue,
} from '../../ui';
import Identifier from '../../datatypes/Identifier';
import Accordion from '../../containers/Accordion';
import Date from '../../datatypes/Date';
import Address from '../../datatypes/Address';
import Telecom from '../../datatypes/Telecom';
import { PatientContact } from '../Patient/Patient';

const commonDTO = fhirResource => {
  const identifier = _get(fhirResource, 'identifier.0');
  const period = _has(fhirResource, 'period');
  const coverageFrom = _get(fhirResource, 'period.start');
  const coverageTo = _get(fhirResource, 'period.end');

  return {
    identifier,
    period,
    coverageFrom,
    coverageTo,
  };
};
const dstu2DTO = fhirResource => {
  const planId = _get(fhirResource, 'plan');
  const issuer = _get(fhirResource, 'issuer');
  const type = _get(fhirResource, 'type');
  return {
    issuer,
    planId,
    type,
  };
};
const stu3DTO = fhirResource => {
  const issuer = _get(fhirResource, 'payor.0');
  const planId = _get(fhirResource, 'grouping.plan');
  const type = _get(fhirResource, 'type.coding.0');
  const details = {
    planDescription: _get(fhirResource, 'grouping.planDisplay'),
    classDescription: _get(fhirResource, 'grouping.classDisplay'),
  };
  const hasDetails = Object.values(details).filter(item => !!item).length > 0;
  const extensionRaw = _get(fhirResource, 'extension');
  const hasExtension = Array.isArray(extensionRaw) && extensionRaw.length > 0;

  let extension = [];
  if (hasExtension) {
    extension = extensionRaw.map(item => ({ coding: [item.valueCoding] }));
  }

  return {
    planId,
    issuer,
    type,
    details,
    hasDetails,
    extension,
    hasExtension,
  };
};
const r4DTO = fhirResource => {
  const issuer = _get(fhirResource, 'payor.0');
  const planId = _get(fhirResource, 'class.plan');
  const type = _get(fhirResource, 'type.coding.0');
  const details = {
    planDescription: _get(fhirResource, 'class.value'),
    classDescription: _get(fhirResource, 'class.type'),
  };
  const hasDetails = Object.values(details).filter(item => !!item).length > 0;
  let extension = _get(fhirResource, 'class');
  const hasExtension = Array.isArray(extension) && extension.length > 0;
  if (hasExtension) {
    extension = extension.map(item => ({
      ...item,
      coding: _get(item, 'type.coding'),
    }));
  }
  return {
    planId,
    issuer,
    type,
    details,
    hasDetails,
    extension,
    hasExtension,
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
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Coverage = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Coverage" />;
  }

  const {
    planId,
    issuer,
    period,
    coverageFrom,
    coverageTo,
    type,
    details,
    hasDetails,
    extension,
    hasExtension,
    identifier,
  } = fhirResourceData;
  const issuerReferenceType = _get(issuer, 'reference');
  const issuerIdentifierType = _get(issuer, 'identifier');

  const tableData = [
    {
      label: 'Issuer',
      testId: 'issuer',
      data: issuerReferenceType && <Reference fhirData={issuer} />,
      status: issuerReferenceType,
    },
    {
      label: 'Issuer',
      testId: 'issuer',
      data: issuerIdentifierType && <Identifier fhirData={issuer.identifier} />,
      status: issuerIdentifierType,
    },
    {
      label: 'PlanId',
      testId: 'planId',
      data: planId,
      status: planId,
    },
    {
      label: 'Coverage',
      testId: '',
      data: period && (
        <>
          {coverageFrom && (
            <span data-testid="coverageFrom">from: {coverageFrom}</span>
          )}{' '}
          {coverageTo && <span data-testid="coverageTo">to: {coverageTo}</span>}
        </>
      ),
      status: period,
    },
    {
      label: 'Type of coverage',
      testId: 'type',
      data: type && <Coding fhirData={type} />,
      status: type,
    },
    {
      label: 'Details',
      testId: 'details',
      data: hasDetails && (
        <>
          <span>{details.planDescription}</span>
          {details.classDescription && (
            <>
              {' | '}
              <span>{details.classDescription}</span>
            </>
          )}
        </>
      ),
      status: hasDetails,
    },
    {
      label: 'Extension',
      testId: 'extensions',
      data:
        hasExtension &&
        extension.map((item, i) => {
          const coding = Array.isArray(item.coding) ? item.coding : [];

          return (
            <span key={`item-${i}`}>
              {item.name && <span>{item.name}</span>}
              {coding.map((code, j) => (
                <Coding key={`item-${j}`} fhirData={code} />
              ))}
            </span>
          );
        }),
      status: hasExtension,
    },
  ];

  return (
    <Root name="coverage">
      <Accordion
        headerContent={
          <Header
            resourceName="Coverage"
            additionalContent={
              identifier && (
                <Value label="Identifier" data-testid="headerStartDate">
                  <Identifier fhirData={identifier} valueOnly noCursive />
                </Value>
              )
            }
            title="Coverage"
            icon={fhirIcons}
          />
        }
        bodyContent={<Body tableData={tableData} />}
      />
    </Root>
  );
};

Coverage.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Coverage;
