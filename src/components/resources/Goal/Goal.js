import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import _get from 'lodash/get';
import _has from 'lodash/has';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
  MissingValue,
} from '../../ui';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'note[0].text', 'Goal');
  const status = _get(fhirResource, 'status', '');
  const hasStatus = _has(fhirResource, 'status');
  const startDate = _get(fhirResource, 'startDate');
  const category = _get(fhirResource, 'category');
  const hasCategory = Array.isArray(category);
  const hasUdi = _has(fhirResource, 'udi');
  const udi = _get(fhirResource, 'udi');
  const addresses = _get(fhirResource, 'addresses');
  const hasAddresses = Array.isArray(addresses);
  const author = _get(fhirResource, 'author');
  const priority = _get(fhirResource, 'priority.coding[0]');
  const subject = _get(fhirResource, 'subject');
  const statusDate = _get(fhirResource, 'statusDate');
  return {
    title,
    status,
    hasStatus,
    startDate,
    hasCategory,
    category,
    hasUdi,
    udi,
    addresses,
    hasAddresses,
    author,
    priority,
    subject,
    statusDate,
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
const r4DTO = fhirResource => {
  const description = _get(fhirResource, 'description.text', null);
  const status = _get(fhirResource, 'lifecycleStatus', '');
  const hasStatus = _has(fhirResource, 'lifecycleStatus');
  const achievementStatus = _get(fhirResource, 'achievementStatus.coding[0]');

  return {
    status,
    hasStatus,
    achievementStatus,
    description,
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
    hasStatus,
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
    achievementStatus,
    priority,
    subject,
    statusDate,
  } = fhirResourceData;

  return (
    <Root name="Goal">
      <Header>
        <Title data-testid="title">{title}</Title>
        {hasStatus && <Badge data-testid="status">{status}</Badge>}
        {startDate && (
          <BadgeSecondary data-testid="statusSecondary">
            starting on {startDate}
          </BadgeSecondary>
        )}
      </Header>
      <Body>
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {statusDate && (
          <Value label="Status Date" data-testid="statusDate">
            <Date fhirData={statusDate} />
          </Value>
        )}
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
        {priority && (
          <Value label="Priority" data-testid="priority">
            <Coding fhirData={priority} />
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
        {achievementStatus && (
          <Value label="Achievement Status" data-testid="achievementStatus">
            <Coding fhirData={achievementStatus} />
          </Value>
        )}
      </Body>
    </Root>
  );
};

Goal.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Goal;
