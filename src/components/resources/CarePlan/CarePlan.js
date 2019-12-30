import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';

import CarePlanActivity from './CarePlanActivity';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';

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
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }}>Care Plan</h4>
        &nbsp;(<span data-testid="title">{status}</span>
        {expiry && <span className="text-muted">, expires on ${expiry}</span>})
      </div>
      <div className="container">
        {hasCategory && (
          <>
            <div className="row">
              <span>
                <small className="text-uppercase text-muted">
                  <strong>Category</strong>
                </small>
              </span>
            </div>
            <div className="row" data-testid="category">
              {category.map((category, i) =>
                (category.coding || []).map((coding, j) => (
                  <Coding key={`item-${i}${j}`} fhirData={coding} />
                )),
              )}
            </div>
          </>
        )}
        {hasGoals && (
          <>
            <div className="row">
              <span>
                <small className="text-uppercase text-muted">
                  <strong>Goal</strong>
                </small>
              </span>
            </div>
            {goals.map((goal, i) => {
              return (
                <div key={`goal-${i}`} className="row">
                  <div className="col-12 pl-0 pr-0">
                    <Reference fhirData={goal} />
                  </div>
                </div>
              );
            })}
          </>
        )}
        {hasAddresses && (
          <>
            <span>
              <small className="text-uppercase text-muted">
                <strong>Addresses</strong>
              </small>
            </span>
            <div data-testid="addresses">
              {addresses.map((address, i) => {
                return (
                  <div key={`item-${i}`} className="row">
                    <div className="col-12 pl-0 pr-0">
                      <Reference fhirData={address} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {hasActivity && (
          <>
            <span>
              <small className="text-uppercase text-muted">
                <strong>Activity</strong>
              </small>
            </span>
            <div data-testid="activity">
              {activity.map((activity, i) => {
                return (
                  <div key={`item-${i}`} className="row">
                    <div className="col-12 pl-0 pr-0">
                      <CarePlanActivity fhirData={activity} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CarePlan.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf(['dstu2', 'stu3']),
};

export default CarePlan;
