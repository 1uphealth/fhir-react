import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import prettyBytes from 'pretty-bytes';

import fhirTypes from '../fhirResourceTypes';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import {
  Root,
  Body,
  Header,
  Title,
  Badge,
  BadgeSecoundary,
  Value,
  ValueSection,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  MissingValue,
} from '../../ui';

const commonDTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  const status = _get(fhirResource, 'status');
  const typeCoding = _get(fhirResource, 'type.coding[0]');
  const classCoding = _get(fhirResource, 'class.coding[0]');
  const createdAt = _get(fhirResource, 'created');
  const securityLabelCoding = _get(fhirResource, 'securityLabel[0].coding[0]');
  const eventCoding = _get(fhirResource, 'context.event[0].coding[0]');
  const facilityTypeCoding = _get(
    fhirResource,
    'context.facilityType.coding[0]',
  );
  const practiceSettingCoding = _get(
    fhirResource,
    'context.practiceSetting.coding[0]',
  );
  const periodStart = _get(fhirResource, 'context.period.start');
  const periodEnd = _get(fhirResource, 'context.period.end');
  const context = {
    eventCoding,
    facilityTypeCoding,
    practiceSettingCoding,
    periodStart,
    periodEnd,
  };

  return {
    description,
    status,
    typeCoding,
    classCoding,
    createdAt,
    securityLabelCoding,
    context,
  };
};

const dstu2DTO = fhirResource => {
  const docStatus =
    _get(fhirResource, 'docStatus.coding[0].display') ||
    _get(fhirResource, 'docStatus.coding[0].code');

  return {
    docStatus,
  };
};

const stu3DTO = fhirResource => {
  const docStatus = _get(fhirResource, 'docStatus');

  return {
    docStatus,
  };
};

const contentDTO = (fhirVersion, fhirResource) => {
  return {
    content: _get(fhirResource, 'content', []).map(item => {
      const url = _get(item, 'attachment.url');
      const size = _get(item, 'attachment.size');

      let formatCoding = null;
      switch (fhirVersion) {
        case fhirTypes.DSTU2: {
          formatCoding = _get(item, 'format[0]');
          break;
        }
        case fhirTypes.STU3: {
          formatCoding = _get(item, 'format');
          break;
        }
        default:
          throw Error('Unrecognized the fhir version property type.');
      }

      return {
        url,
        size,
        formatCoding,
      };
    }),
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...contentDTO(fhirVersion, fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...contentDTO(fhirVersion, fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const ContentItem = props => {
  const { item } = props;
  const hasSize = Number.isFinite(item.size);
  const hasFormat = !!item.formatCoding;
  const hasURL = !!item.url;

  return (
    <TableRow>
      <TableCell data-testid="content.format">
        {hasFormat ? <Coding fhirData={item.formatCoding} /> : <MissingValue />}
      </TableCell>
      <TableCell data-testid="content.size">
        {hasSize ? prettyBytes(item.size) : <MissingValue />}
      </TableCell>
      <TableCell data-testid="content.url">
        {hasURL ? (
          <a href={item.url} rel="noopener noreferrer" target="_blank">
            {item.url}
          </a>
        ) : (
          <MissingValue />
        )}
      </TableCell>
    </TableRow>
  );
};

const Content = props => {
  const { content } = props;
  const allContent = content.map((item, i) => (
    <ContentItem key={i} item={item} />
  ));
  return (
    <ValueSection label="Content">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Format</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>URL</TableHeader>
          </TableRow>
        </thead>
        <tbody>{allContent}</tbody>
      </Table>
    </ValueSection>
  );
};

const DocumentReference = props => {
  const { fhirVersion, fhirResource } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="DocumentReference" />;
  }

  const {
    description,
    status,
    docStatus,
    typeCoding,
    classCoding,
    createdAt,
    securityLabelCoding,
    content,
    context,
  } = fhirResourceData;
  const hasContent = content.length > 0;
  const hasPeriod = context.periodStart || context.periodEnd;

  return (
    <Root name="DocumentReference">
      <Header>
        <Title data-testid="description">{description}</Title>
        <Badge data-testid="status">{status}</Badge>
        {docStatus && (
          <BadgeSecoundary data-testid="docStatus">{docStatus}</BadgeSecoundary>
        )}
      </Header>
      <Body>
        <Value label="Document type" data-testid="type">
          <Coding fhirData={typeCoding} />
        </Value>
        {classCoding && (
          <Value label="Document categorization" data-testid="class">
            <Coding fhirData={classCoding} />
          </Value>
        )}
        {securityLabelCoding && (
          <Value label="Security Label" data-testid="securityLabel">
            <Coding fhirData={securityLabelCoding} />
          </Value>
        )}
        {createdAt && (
          <Value label="Created At" data-testid="createdAt">
            <DateType fhirData={createdAt} />
          </Value>
        )}
        <ValueSection label="Context">
          {context.eventCoding && (
            <Value label="Event" data-testid="context.event">
              <Coding fhirData={context.eventCoding} />
            </Value>
          )}
          {context.facilityTypeCoding && (
            <Value label="Facility" data-testid="context.facilityType">
              <Coding fhirData={context.facilityTypeCoding} />
            </Value>
          )}
          {context.practiceSettingCoding && (
            <Value
              label="Practice Setting"
              data-testid="context.practiceSetting"
            >
              <Coding fhirData={context.practiceSettingCoding} />
            </Value>
          )}
          {hasPeriod && (
            <Value label="Period" data-testid="context.period">
              {context.periodStart && (
                <DateType fhirData={context.periodStart} />
              )}
              {' - '}
              {context.periodEnd && <DateType fhirData={context.periodEnd} />}
            </Value>
          )}
        </ValueSection>
        {hasContent && <Content content={content} />}
      </Body>
    </Root>
  );
};

DocumentReference.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default DocumentReference;
