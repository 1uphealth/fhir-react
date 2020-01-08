import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import fhirTypes from '../fhirResourceTypes';
import DateType from '../../datatypes/Date';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

const commonDTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  const status = _get(fhirResource, 'status');
  const type_ =
    _get(fhirResource, 'type.coding[0].display') ||
    _get(fhirResource, 'type.coding[0].code');
  const class_ =
    _get(fhirResource, 'class.coding[0].display') ||
    _get(fhirResource, 'class.coding[0].code');
  const createdAt = _get(fhirResource, 'created');
  const securityLabel =
    _get(fhirResource, 'securityLabel[0].coding[0].display') ||
    _get(fhirResource, 'securityLabel[0].coding[0].code');
  const content = {}; // TODO
  const context = []; // TODO
  return {
    description,
    status,
    type_,
    class_,
    createdAt,
    securityLabel,
    content,
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

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
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
    type_,
    class_,
    createdAt,
    securityLabel,
    content,
    context,
  } = fhirResourceData;
  const hasContent = content.length > 0;

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
          <div data-testid="type">{type_}</div>
        </div>
        {class_ && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Document categorization</strong>
            </small>
            <div data-testid="class">{class_}</div>
          </div>
        )}
        {securityLabel && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Security Label</strong>
            </small>
            <div data-testid="securityLabel">{securityLabel}</div>
          </div>
        )}
        {createdAt && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Created At</strong>
            </small>
            <div data-testid="createdAt">
              {<DateType fhirData={createdAt} />}
            </div>
          </div>
        )}
        {context && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Context</strong>
            </small>
            <div>{'TODO: context'}</div>
          </div>
        )}
        {hasContent && (
          <div>
            <small className="text-muted text-uppercase">
              <strong>Content</strong>
            </small>
            <div>{'TODO: content'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

DocumentReference.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default DocumentReference;
