import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import { hasValue } from '../../datatypes/CodeableConcept';
import DateType from '../../datatypes/Date';
import { isNotEmptyArray } from '../../../utils';

import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import CarePlanActivity from './CarePlanActivity';
import './CarePlan.css';

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
  const status = _get(fhirResource, 'status', '');
  const expiry = _get(fhirResource, 'expiry');
  const category = _get(fhirResource, 'category');
  const hasCategory = Array.isArray(_get(fhirResource, 'category.0.coding'));
  const goals = _get(fhirResource, 'goal');
  const hasGoals = Array.isArray(goals);
  const addresses = _get(fhirResource, 'addresses');
  const hasAddresses = Array.isArray(addresses);
  const description = _get(fhirResource, 'description');
  const subject = _get(fhirResource, 'subject');
  const periodStart = _get(fhirResource, 'period.start');
  const periodEnd = _get(fhirResource, 'period.end');
  const author = _get(fhirResource, 'author');

  return {
    status,
    expiry,
    category,
    hasCategory,
    goals,
    hasGoals,
    addresses,
    hasAddresses,
    description,
    subject,
    periodStart,
    periodEnd,
    author,
  };
};

const dstu2DTO = fhirResource => {
  let activity = _get(fhirResource, 'activity');
  const hasActivity = Array.isArray(activity);
  activity = !hasActivity
    ? activity
    : activity.map(item => {
        const categories = _get(item, 'detail.category.coding');
        return {
          title:
            _get(item, 'detail.code.text') ||
            _get(item, 'detail.code.coding[0].code'),
          hasCategories: Array.isArray(categories),
          categories,
        };
      });

  return {
    activity,
    hasActivity,
  };
};
const stu3DTO = fhirResource => {
  let activity = _get(fhirResource, 'activity');
  const hasActivity = Array.isArray(activity);
  activity = !hasActivity
    ? activity
    : activity.map(item => {
        const categories = [
          ..._get(item, 'detail.category.coding', []),
          ..._get(item, 'detail.code.coding', []),
        ];
        return {
          title:
            _get(item, 'detail.code.text') ||
            _get(item, 'detail.code.coding[0].code'),
          hasCategories: Array.isArray(categories) && categories.length > 0,
          categories,
        };
      });
  const basedOn = _get(fhirResource, 'basedOn', []);
  const partOf = _get(fhirResource, 'partOf', []);
  const intent = _get(fhirResource, 'intent', []);
  return {
    activity,
    hasActivity,
    basedOn,
    partOf,
    intent,
  };
};

const r4DTO = fhirResource => {
  let activity = _get(fhirResource, 'activity');
  const hasActivity = Array.isArray(activity);
  activity = !hasActivity
    ? activity
    : activity.map(item => {
        const categories = [
          ..._get(item, 'detail.category.coding', []),
          ..._get(item, 'detail.code.coding', []),
        ];
        return {
          title:
            _get(item, 'detail.code.text') ||
            _get(item, 'detail.code.coding[0].code'),
          hasCategories: Array.isArray(categories) && categories.length > 0,
          categories,
        };
      });

  const basedOn = _get(fhirResource, 'basedOn', []);
  const partOf = _get(fhirResource, 'partOf', []);
  const intent = _get(fhirResource, 'intent', []);
  return {
    activity,
    hasActivity,
    basedOn,
    partOf,
    intent,
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

const CarePlan = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="CarePlan" />;
  }

  const {
    status,
    expiry,
    category,
    hasCategory,
    goals,
    hasGoals,
    addresses,
    hasAddresses,
    activity,
    hasActivity,
    basedOn,
    partOf,
    intent,
    description,
    subject,
    periodStart,
    periodEnd,
    author,
  } = fhirResourceData;

  const authorArr = Array.isArray(author) ? author : [author];
  return (
    <Root name="CarePlan">
      <Header>
        <Title>Care Plan</Title>
        <Badge data-testid="status">{status}</Badge>
        {expiry && <BadgeSecondary>expires on ${expiry}</BadgeSecondary>}
      </Header>
      <Body>
        {hasCategory && (
          <Value label="Category" data-testid="category">
            {category.map((category, i) =>
              (category.coding || []).map((coding, j) => (
                <Coding key={`item-${i}${j}`} fhirData={coding} />
              )),
            )}
          </Value>
        )}
        {intent && (
          <Value label="Intent" data-testid="intent">
            {intent}
          </Value>
        )}
        {hasGoals && (
          <Value label="Goals" data-testid="goals">
            {goals.map((goal, i) => (
              <div key={`goal-${i}`}>
                <Reference fhirData={goal} />
              </div>
            ))}
          </Value>
        )}
        {description && (
          <Value label="Description" data-testid="description">
            {description}
          </Value>
        )}
        {subject && (
          <Value label="Subject" data-testid="subject">
            <Reference fhirData={subject} />
          </Value>
        )}
        {hasValue(author) && (
          <Value label="Author" data-testid="author">
            {authorArr.map((item, i) => (
              <Reference key={`author-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {periodStart && (
          <Value label="Plan Period Start" data-testid="periodStart">
            {periodStart ? (
              <DateType fhirData={periodStart} />
            ) : (
              <MissingValue />
            )}
          </Value>
        )}
        {periodEnd && (
          <Value label="Plan Period End" data-testid="periodEnd">
            {periodEnd ? <DateType fhirData={periodEnd} /> : <MissingValue />}
          </Value>
        )}
        {hasAddresses && (
          <Value label="Addresses" data-testid="addresses">
            {addresses.map((address, i) => (
              <div key={`item-${i}`}>
                <Reference fhirData={address} />
              </div>
            ))}
          </Value>
        )}
        {isNotEmptyArray(basedOn) && (
          <Value label="Based on" data-testid="basedOn">
            {basedOn.map((item, i) => (
              <Reference key={`based-on-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {isNotEmptyArray(partOf) && (
          <Value label="Part of" data-testid="partOf">
            {partOf.map((item, i) => (
              <Reference key={`part-of-${i}`} fhirData={item} />
            ))}
          </Value>
        )}
        {hasActivity && (
          <Value label="Activity" data-testid="activity">
            {activity.map((activity, i) => (
              <div key={`item-${i}`}>
                <CarePlanActivity fhirData={activity} />
              </div>
            ))}
          </Value>
        )}
      </Body>
    </Root>
  );
};

CarePlan.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]),
};

export default CarePlan;
