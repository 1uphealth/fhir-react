import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import prettyBytes from 'pretty-bytes';

import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import {
  Root,
  Body,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Value,
  ValueSection,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  MissingValue,
} from '../../ui';
import Attachment from '../../datatypes/Attachment';

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

const r4DTO = fhirResource => {
  const classCoding = _get(fhirResource, 'category.coding[0]');
  const createdAt = _get(fhirResource, 'date');

  return {
    classCoding,
    createdAt,
  };
};

const contentDTO = (fhirVersion, fhirResource) => {
  return {
    content: _get(fhirResource, 'content', []).map(item => {
      const attachmentUrl = _get(item, 'attachment.url');
      let url = attachmentUrl;
      let isUrlBinaryResourceReference = false;

      // Check if URL ends with "/Binary/someId". If so, swap the url for this reference, and change the flag to render different component.
      // For now raw link to the resource won't open properly, so it's better to show more valuable info for the user.
      const regex = /\/(Binary\/[\w-]+$)/gm;
      const matches = Array.from(attachmentUrl.matchAll(regex), m => m[1]);
      if (matches.length > 0) {
        url = matches[0];
        isUrlBinaryResourceReference = true;
      }

      const size = _get(item, 'attachment.size');

      let formatCoding = null;
      switch (fhirVersion) {
        case fhirVersions.DSTU2: {
          formatCoding = _get(item, 'format[0]');
          break;
        }
        case fhirVersions.STU3: {
          formatCoding = _get(item, 'format');
          break;
        }
        case fhirVersions.R4: {
          formatCoding = _get(item, 'format');
          break;
        }
        default:
          throw Error('Unrecognized the fhir version property type.');
      }

      return {
        url,
        isUrlBinaryResourceReference,
        size,
        formatCoding,
      };
    }),
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...contentDTO(fhirVersion, fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...contentDTO(fhirVersion, fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...contentDTO(fhirVersion, fhirResource),
        ...r4DTO(fhirResource),
      };
    }
    default: {
      throw Error('Unrecognized the fhir version property type.');
    }
  }
};

const ContentItem = props => {
  const { item } = props;
  const { url, isUrlBinaryResourceReference, size, formatCoding } = item;
  const hasSize = Number.isFinite(size);
  const hasFormat = !!formatCoding;
  const hasURL = !!url;

  let linkComponent;
  if (hasURL) {
    linkComponent = isUrlBinaryResourceReference ? (
      url
    ) : (
      <Attachment fhirData={item} />
    );
  } else {
    linkComponent = <MissingValue />;
  }

  return (
    <TableRow>
      <TableCell data-testid="content.format">
        {hasFormat ? <Coding fhirData={formatCoding} /> : <MissingValue />}
      </TableCell>
      <TableCell data-testid="content.size">
        {hasSize ? prettyBytes(size) : <MissingValue />}
      </TableCell>
      <TableCell data-testid="content.url">{linkComponent}</TableCell>
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
            <TableHeader>Resource</TableHeader>
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
        {status && <Badge data-testid="status">{status}</Badge>}
        {docStatus && (
          <BadgeSecondary data-testid="docStatus">{docStatus}</BadgeSecondary>
        )}
      </Header>
      <Body>
        {typeCoding && (
          <Value label="Document type" data-testid="type">
            <Coding fhirData={typeCoding} />
          </Value>
        )}
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
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default DocumentReference;
