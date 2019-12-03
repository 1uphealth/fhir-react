import React from 'react';
import ResourceContainer from '../container/ResourceContainer';
import Reference from '../datatypes/Reference';
import Coding from '../datatypes/Coding';
var _ = require('lodash');

// TODO decide: is CarePlanAddresses component useful
// eslint-disable-next-line no-unused-vars
class CarePlanAddresses extends React.Component {
  render() {
    return (
      <div className="mb-2">
        <h6 className="mb-0">
          <strong>
            {_.get(this.props.fhirData, 'detail.code.text') ||
              _.get(this.props.fhirData, 'detail.code.coding[0].code')}
          </strong>
        </h6>
        {typeof _.get(this.props.fhirData, 'detail.category') === 'undefined'
          ? ''
          : (_.get(this.props.fhirData, 'detail.category').coding || []).map(
              function(coding) {
                return <Coding fhirData={coding} />;
              },
            )}
      </div>
    );
  }
}

class CarePlanActivity extends React.Component {
  render() {
    return (
      <div className="mb-2">
        <h6 className="mb-0">
          <strong>
            {_.get(this.props.fhirData, 'detail.code.text') ||
              _.get(this.props.fhirData, 'detail.code.coding[0].code')}
          </strong>
        </h6>
        {typeof _.get(this.props.fhirData, 'detail.category') === 'undefined'
          ? ''
          : (_.get(this.props.fhirData, 'detail.category').coding || []).map(
              function(coding) {
                return <Coding fhirData={coding} />;
              },
            )}
      </div>
    );
  }
}

class CarePlan extends React.Component {
  render() {
    return (
      <div>
        <ResourceContainer {...this.props}>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <h4
              style={{ display: 'inline-block' }}
            >{`${this.props.fhirResource.status} Care Plan`}</h4>
            &nbsp;({_.get(this.props.fhirResource, 'status') || ''}
            <span className="text-muted">
              {typeof _.get(this.props.fhirResource, 'expiry') === 'undefined'
                ? ''
                : `, expires on ${_.get(this.props.fhirResource, 'expiry')}`}
            </span>
            )
          </div>
          <div className="container">
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'category') ===
              'undefined' ? (
                ''
              ) : (
                <span>
                  <small className="text-uppercase text-muted">
                    <strong>Category</strong>
                  </small>
                </span>
              )}
            </div>
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'category') === 'undefined'
                ? ''
                : (_.get(this.props.fhirResource, 'category') || []).map(
                    function(category) {
                      return (category.coding || []).map(function(coding) {
                        return <Coding fhirData={coding} />;
                      });
                    },
                  )}
            </div>
            <br />
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'addresses') ===
              'undefined' ? (
                ''
              ) : (
                <span>
                  <small className="text-uppercase text-muted">
                    <strong>Goal</strong>
                  </small>
                </span>
              )}
            </div>
            {typeof _.get(this.props.fhirResource, 'goal') === 'undefined'
              ? ''
              : (_.get(this.props.fhirResource, 'goal') || []).map(function(
                  goal,
                ) {
                  return (
                    <div className="row">
                      <div className="col-12 pl-0 pr-0">
                        <Reference fhirData={goal} />
                      </div>
                    </div>
                  );
                })}
            <br />
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'addresses') ===
              'undefined' ? (
                ''
              ) : (
                <span>
                  <small className="text-uppercase text-muted">
                    <strong>Addresses</strong>
                  </small>
                </span>
              )}
            </div>
            {typeof _.get(this.props.fhirResource, 'addresses') === 'undefined'
              ? ''
              : (_.get(this.props.fhirResource, 'addresses') || []).map(
                  function(addresses) {
                    return (
                      <div className="row">
                        <div className="col-12 pl-0 pr-0">
                          <Reference fhirData={addresses} />
                        </div>
                      </div>
                    );
                  },
                )}
            <br />
            <div className="row">
              {typeof _.get(this.props.fhirResource, 'activity') ===
              'undefined' ? (
                ''
              ) : (
                <span>
                  <small className="text-uppercase text-muted">
                    <strong>Activity</strong>
                  </small>
                </span>
              )}
            </div>
            {typeof _.get(this.props.fhirResource, 'activity') === 'undefined'
              ? ''
              : (_.get(this.props.fhirResource, 'activity') || []).map(function(
                  activity,
                ) {
                  return (
                    <div className="row">
                      <div className="col-12 pl-0 pr-0">
                        <CarePlanActivity fhirData={activity} />
                      </div>
                    </div>
                  );
                })}
          </div>
        </ResourceContainer>
      </div>
    );
  }
}
export default CarePlan;
