import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import _has from 'lodash/has';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'note[0].text');
  const status = _get(fhirResource, 'status', '');
  const _hasStatus = _has(fhirResource, 'status');
  const startDate = _get(fhirResource, 'startDate', ' ---');
  const category = _get(fhirResource, 'category');
  const hasCategory = Array.isArray(category);
  const hasUdi = _has(fhirResource, 'udi');
  const udi = _get(fhirResource, 'udi');
  const addresses = _get(fhirResource, 'addresses');
  const hasAddresses = Array.isArray(addresses);
  const author = _get(fhirResource, 'author');
  return {
    title,
    status,
    _hasStatus,
    startDate,
    hasCategory,
    category,
    hasUdi,
    udi,
    addresses,
    hasAddresses,
    author,
  };
};
const dstu2DTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  return {
    description,
  };
};
const stu3DTO = fhirResource => {
  const description = _get(fhirResource, 'description.text', null);
  const title = _get(fhirResource, 'statusReason');
  const outcomeReference = _get(fhirResource, 'outcomeReference');
  return {
    description,
    title,
    outcomeReference,
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

const Goal = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Goal" />;
  }
  const {
    title,
    status,
    _hasStatus,
    startDate,
    hasCategory,
    category,
    hasUdi,
    udi,
    addresses,
    hasAddresses,
    author,
    description,
    outcomeReference,
  } = fhirResourceData;

  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>
        &nbsp;{status}{' '}
        {_hasStatus && (
          <>
            (
            <span className="text-muted" data-testid="status">
              status {status} starting on {startDate}
            </span>
            )
          </>
        )}
      </div>
      {description && (
        <div data-testid="description">
          <small className="text-uppercase text-muted">
            <strong>Description</strong>
          </small>
          {description}
        </div>
      )}
      {hasCategory && (
        <div data-testid="category">
          {category.map((item, i) => {
            const coding = _get(item, 'coding', []);
            if (!Array.isArray(coding)) {
              return null;
            }
            return coding.map((codingItem, j) => (
              <div key={`item-${j}`}>
                <Coding fhirData={codingItem} />
              </div>
            ));
          })}
        </div>
      )}
      {hasUdi && (
        <div>
          <span>
            <small className="text-uppercase text-muted">
              <strong>universal device identifier</strong>
            </small>
            <small> {udi}</small>
          </span>
        </div>
      )}
      {hasAddresses && (
        <div data-testid="addresses">
          <span>
            <small className="text-uppercase text-muted">
              <strong>Addresses</strong>
            </small>
          </span>
          <br />
          {addresses.map((address, i) => {
            return (
              <div key={`item-${i}`}>
                <div className="col-12 pl-0 pr-0">
                  <Reference fhirData={address} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {author && (
        <div data-testid="author">
          <span>
            <small className="text-uppercase text-muted">
              <strong>Author</strong>
            </small>
          </span>
          <div className="col-12 pl-0 pr-0">
            <Reference fhirData={author} />
          </div>
        </div>
      )}
      {outcomeReference && (
        <div data-testid="outcomeReference">
          <span>
            <small className="text-uppercase text-muted">
              <strong>Outcome</strong>
            </small>
          </span>
          <div className="col-12 pl-0 pr-0">
            {outcomeReference.map((item, i) => (
              <Reference key={`item-${i}`} fhirData={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Goal.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']).isRequired,
};

export default Goal;
