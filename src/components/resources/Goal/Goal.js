import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import _has from 'lodash/has';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecoundary,
  Body,
  Value,
} from '../../ui';

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
    <Root name="Goal">
      <Header>
        <Title data-testid="title">{title}</Title>
        <Badge data-testid="status">{status}</Badge>
        {_hasStatus && (
          <BadgeSecoundary>starting on {startDate}</BadgeSecoundary>
        )}
      </Header>
      <Body>
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {hasCategory && (
          <Value label="Category" data-testid="category">
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
          </Value>
        )}
        {hasUdi && <Value label="Universal Device Identifier"> {udi}</Value>}
        {hasAddresses && (
          <Value label="Addresses" data-testid="addresses">
            {addresses.map((address, i) => {
              return (
                <div key={`item-${i}`}>
                  <Reference fhirData={address} />
                </div>
              );
            })}
          </Value>
        )}
        {author && (
          <Value label="Author" data-testid="author">
            <Reference fhirData={author} />
          </Value>
        )}
        {outcomeReference && (
          <Value label="Outcome" data-testid="outcomeReference">
            {outcomeReference.map((item, i) => (
              <Reference key={`item-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

Goal.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']).isRequired,
};

export default Goal;
