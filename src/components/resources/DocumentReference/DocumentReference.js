import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import prettyBytes from 'pretty-bytes';

import fhirTypes from '../fhirResourceTypes';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

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
    <div className="row">
      <div className="col-sm-5" data-testid="content.format">
        {hasFormat ? <Coding fhirData={item.formatCoding} /> : '-'}
      </div>
      <div className="col-sm-2" data-testid="content.size">
        {hasSize ? prettyBytes(item.size) : '-'}
      </div>
      <div className="col-sm-5" data-testid="content.url">
        {hasURL ? (
          <a href={item.url} rel="noopener noreferrer" target="_blank">
            {item.url}
          </a>
        ) : (
          '-'
        )}
      </div>
    </div>
  );
};

const Content = props => {
  const { content } = props;
  const allContent = content.map((item, i) => (
    <ContentItem key={i} item={item} />
  ));
  return (
    <div className="container-fluid">
      <div className="row">
        <span>
          <small className="text-uppercase text-muted">
            <strong>Content</strong>
          </small>
        </span>
      </div>
      <div className="row">
        <div className="col-sm-5">
          <small className="text-uppercase text-muted">
            <strong>Format</strong>
          </small>
        </div>
        <div className="col-sm-2">
          <small className="text-uppercase text-muted">
            <strong>Size</strong>
          </small>
        </div>
        <div className="col-sm-5">
          <small className="text-uppercase text-muted">
            <strong>URL</strong>
          </small>
        </div>
      </div>
      {allContent}
    </div>
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
    <div>
      <div>
        <h4 style={{ display: 'inline-block' }} data-testid="description">
          {description}
        </h4>
        <span className="text-muted" data-testid="status">
          {status}
        </span>
        {docStatus && (
          <span className="text-muted" data-testid="docStatus">
            {docStatus}
          </span>
        )}
      </div>
      <div>
        <div>
          <small className="text-muted text-uppercase">
            <strong>Document type</strong>
          </small>
          <div data-testid="type">
            <Coding fhirData={typeCoding} />
          </div>
        </div>
        {classCoding && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Document categorization</strong>
            </small>
            <div data-testid="class">
              <Coding fhirData={classCoding} />
            </div>
          </div>
        )}
        {securityLabelCoding && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Security Label</strong>
            </small>
            <div data-testid="securityLabel">
              <Coding fhirData={securityLabelCoding} />
            </div>
          </div>
        )}
        {createdAt && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Created At</strong>
            </small>
            <div data-testid="createdAt">
              <DateType fhirData={createdAt} />
            </div>
          </div>
        )}
        <div>
          <small className="text-muted text-uppercase">
            <strong>Context</strong>
          </small>
        </div>
        {context.eventCoding && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Event</strong>
            </small>
            <div data-testid="context.event">
              {<Coding fhirData={context.eventCoding} />}
            </div>
          </div>
        )}
        {context.facilityTypeCoding && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Facility</strong>
            </small>
            <div data-testid="context.facilityType">
              {<Coding fhirData={context.facilityTypeCoding} />}
            </div>
          </div>
        )}
        {context.practiceSettingCoding && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Practice Setting</strong>
            </small>
            <div data-testid="context.practiceSetting">
              {<Coding fhirData={context.practiceSettingCoding} />}
            </div>
          </div>
        )}
        {hasPeriod && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Period</strong>
            </small>
            <div data-testid="context.period">
              {context.periodStart && (
                <DateType fhirData={context.periodStart} />
              )}
              {' - '}
              {context.periodEnd && <DateType fhirData={context.periodEnd} />}
            </div>
          </div>
        )}
        {hasContent && <Content content={content} />}
      </div>
    </div>
  );
};

DocumentReference.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default DocumentReference;
