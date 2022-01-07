import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import prettyBytes from 'pretty-bytes';

import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Accordion from '../../containers/Accordion';
import Date from '../../datatypes/Date';

import {
  Root,
  Body,
  Header,
  Badge,
  ValueSectionItem,
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
    <ValueSection label="Content" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Format</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Resource</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">{allContent}</tbody>
      </Table>
    </ValueSection>
  );
};

const DocumentReference = props => {
  const { fhirVersion, fhirResource, fhirIcons } = props;
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

  const tableData = [
    {
      label: 'Document type',
      testId: 'type',
      data: <Coding fhirData={typeCoding} />,
      status: typeCoding,
    },
    {
      label: 'Document categorization',
      testId: 'class',
      data: <Coding fhirData={classCoding} />,
      status: classCoding,
    },
    {
      label: 'Security Label',
      testId: 'securityLabel',
      data: <Coding fhirData={securityLabelCoding} />,
      status: securityLabelCoding,
    },
    {
      label: 'Created At',
      testId: 'createdAt',
      data: <Date fhirData={createdAt} isBlack />,
      status: createdAt,
    },
  ];

  const contextTable = [
    {
      label: 'Event',
      testId: 'context.event',
      data: <Coding fhirData={context.eventCoding} />,
      status: context.eventCoding,
    },
    {
      label: 'Facility',
      testId: 'context.facilityType',
      data: <Coding fhirData={context.facilityTypeCoding} />,
      status: context.facilityTypeCoding,
    },
    {
      label: 'Practice Setting',
      testId: 'context.practiceSetting',
      data: <Coding fhirData={context.practiceSettingCoding} />,
      status: context.practiceSettingCoding,
    },
    {
      label: 'Period',
      testId: 'context.period',
      data: (
        <>
          {context.periodStart && (
            <Date fhirData={context.periodStart} isBlack />
          )}
          {' - '}
          {context.periodEnd && <Date fhirData={context.periodEnd} isBlack />}
        </>
      ),
      status: hasPeriod,
    },
  ];

  const getValueSectionItem = (item, index) =>
    item.status && (
      <ValueSectionItem
        key={`context-item-${index}`}
        label={item.label}
        data-testid={item.testId}
      >
        {item.data}
      </ValueSectionItem>
    );

  return (
    <Root name="DocumentReference">
      <Accordion
        headerContent={
          <Header
            icon={fhirIcons}
            resourceName="DocumentReference"
            title={description}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            additionalBadge={
              docStatus && <Badge data-testid="docStatus">{docStatus}</Badge>
            }
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            <ValueSection label="Context" marginTop>
              {contextTable.map((item, index) =>
                getValueSectionItem(item, index),
              )}
            </ValueSection>
            {hasContent && <Content content={content} />}
          </Body>
        }
      />
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
