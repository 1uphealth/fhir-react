import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';

import CarePlanActivity from './CarePlanActivity';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import './CarePlan.css';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
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

  return {
    status,
    expiry,
    category,
    hasCategory,
    goals,
    hasGoals,
    addresses,
    hasAddresses,
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

  return {
    activity,
    hasActivity,
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
  } = fhirResourceData;

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
        {hasGoals && (
          <Value label="Goals" data-testid="goals">
            {goals.map((goal, i) => (
              <div key={`goal-${i}`}>
                <Reference fhirData={goal} />
              </div>
            ))}
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
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']),
};

export default CarePlan;
