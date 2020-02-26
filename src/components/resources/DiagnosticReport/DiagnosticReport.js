import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';

const commonDTO = fhirResource => {
  const title =
    _get(fhirResource, 'code.text') ||
    _get(fhirResource, 'code.display') ||
    _get(fhirResource, 'code.coding.0.display', null);
  const status = _get(fhirResource, 'status', '');
  const effectiveDateTime = _get(fhirResource, 'effectiveDateTime');
  const categoryCoding = _get(fhirResource, 'category.coding');
  const hasCategoryCoding = Array.isArray(categoryCoding);
  const conclusion = _get(fhirResource, 'conclusion');
  const issued = _get(fhirResource, 'issued');

  return {
    title,
    status,
    effectiveDateTime,
    categoryCoding,
    hasCategoryCoding,
    conclusion,
    issued,
  };
};

const dstu2DTO = fhirResource => {
  const hasPerformer = _has(fhirResource, 'performer');
  const performer = _get(fhirResource, 'performer');
  return {
    hasPerformer,
    performer,
  };
};
const stu3DTO = fhirResource => {
  const hasPerformer = _has(fhirResource, 'performer.0.actor.display');
  const performer = _get(fhirResource, 'performer.0.actor');
  return {
    hasPerformer,
    performer,
  };
};

const r4DTO = fhirResource => {
  let performer = _get(fhirResource, 'performer.0.actor');
  if (!performer) {
    performer = _get(fhirResource, 'performer.0');
  }
  const hasPerformer = !!performer;
  const categoryCoding = _get(fhirResource, 'category.coding');
  const hasCategoryCoding = Array.isArray(categoryCoding);
  return {
    hasPerformer,
    performer,
    categoryCoding,
    hasCategoryCoding,
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

const DiagnosticReport = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="DiagnosticReport" />;
  }

  const {
    title,
    status,
    effectiveDateTime,
    categoryCoding,
    hasCategoryCoding,
    hasPerformer,
    conclusion,
    performer,
    issued,
  } = fhirResourceData;
  return (
    <Root name="DiagnosticReport">
      <Header>
        <Title data-testid="title">{title}</Title>
        <Badge data-testid="status">{status}</Badge>
        {effectiveDateTime && (
          <BadgeSecondary data-testid="effectiveDateTime">
            <Date fhirData={effectiveDateTime} />
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {issued && (
          <Value label="Issued" data-testid="issued">
            <Date fhirData={issued} />
          </Value>
        )}
        {hasCategoryCoding && (
          <Value label="Category" data-testid="categoryCoding">
            {categoryCoding.map((coding, i) => (
              <Coding key={`item-${i}`} fhirData={coding} />
            ))}
          </Value>
        )}
        {hasPerformer && (
          <Value label="Performer" data-testid="performer">
            <Reference fhirData={performer} />
          </Value>
        )}
        {conclusion && (
          <Value label="Conclusion" data-testid="conclusion">
            {conclusion}
          </Value>
        )}
      </Body>
    </Root>
  );
};

DiagnosticReport.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};
export default DiagnosticReport;
