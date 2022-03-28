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

import {
  Root,
  Header,
  Badge,
  BadgeSecondary,
  Body,
  MissingValue,
  ValueSectionItem,
} from '../../ui';
import Accordion from '../../containers/Accordion';

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

const CarePlan = ({ fhirResource, fhirVersion, fhirIcons, onClick }) => {
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
      <Accordion
        headerContent={
          <Header
            icon={fhirIcons}
            resourceName="CarePlan"
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={'Care Plan'}
            additionalContent={
              expiry && <BadgeSecondary>expires on ${expiry}</BadgeSecondary>
            }
          />
        }
        bodyContent={
          <Body>
            {hasCategory && (
              <ValueSectionItem label="Category" data-testid="category">
                {category.map((category, i) =>
                  (category.coding || []).map((coding, j) => (
                    <Coding key={`item-${i}${j}`} fhirData={coding} />
                  )),
                )}
              </ValueSectionItem>
            )}
            {intent && (
              <ValueSectionItem label="Intent" data-testid="intent">
                {intent}
              </ValueSectionItem>
            )}
            {hasGoals && (
              <ValueSectionItem label="Goals" data-testid="goals">
                {goals.map((goal, i) => (
                  <div key={`goal-${i}`}>
                    <Reference fhirData={goal} />
                  </div>
                ))}
              </ValueSectionItem>
            )}
            {description && (
              <ValueSectionItem label="Description" data-testid="description">
                {description}
              </ValueSectionItem>
            )}
            {subject && (
              <ValueSectionItem label="Subject" data-testid="subject">
                <Reference fhirData={subject} />
              </ValueSectionItem>
            )}
            {hasValue(author) && (
              <ValueSectionItem label="Author" data-testid="author">
                {authorArr.map((item, i) => (
                  <Reference key={`author-${i}`} fhirData={item} />
                ))}
              </ValueSectionItem>
            )}
            {periodStart && (
              <ValueSectionItem
                label="Plan Period Start"
                data-testid="periodStart"
              >
                {periodStart ? (
                  <DateType fhirData={periodStart} isBlack />
                ) : (
                  <MissingValue />
                )}
              </ValueSectionItem>
            )}
            {periodEnd && (
              <ValueSectionItem label="Plan Period End" data-testid="periodEnd">
                {periodEnd ? (
                  <DateType fhirData={periodEnd} isBlack />
                ) : (
                  <MissingValue />
                )}
              </ValueSectionItem>
            )}
            {hasAddresses && (
              <ValueSectionItem label="Addresses" data-testid="addresses">
                {addresses.map((address, i) => (
                  <div key={`item-${i}`}>
                    <Reference fhirData={address} />
                  </div>
                ))}
              </ValueSectionItem>
            )}
            {isNotEmptyArray(basedOn) && (
              <ValueSectionItem label="Based on" data-testid="basedOn">
                {basedOn.map((item, i) => (
                  <Reference key={`based-on-${i}`} fhirData={item} />
                ))}
              </ValueSectionItem>
            )}
            {isNotEmptyArray(partOf) && (
              <ValueSectionItem label="Part of" data-testid="partOf">
                {partOf.map((item, i) => (
                  <Reference key={`part-of-${i}`} fhirData={item} />
                ))}
              </ValueSectionItem>
            )}
            {hasActivity && (
              <ValueSectionItem label="Activity" data-testid="activity">
                {activity.map((activity, i) => (
                  <div key={`item-${i}`}>
                    <CarePlanActivity fhirData={activity} />
                  </div>
                ))}
              </ValueSectionItem>
            )}
          </Body>
        }
        onClick={onClick}
      />
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
