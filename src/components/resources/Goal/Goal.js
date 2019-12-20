import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import _has from 'lodash/has';

const Goal = props => {
  const { fhirResource } = props;
  const title = _get(fhirResource, 'note[0].text');
  const status = _get(fhirResource, 'status', '');
  const _hasStatus = _has(fhirResource, 'status');
  const startDate = _get(fhirResource, 'startDate', ' ---');
  const description = _get(fhirResource, 'description');
  const category = _get(fhirResource, 'category');
  const hasCategory = Array.isArray(category);
  const hasUdi = _has(fhirResource, 'udi');
  const udi = _get(fhirResource, 'udi');
  const addresses = _get(fhirResource, 'addresses');
  const hasAddresses = Array.isArray(addresses);
  const author = _get(fhirResource, 'author');
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
      <div className="container">
        <div className="row" data-testid="description">
          {description}
        </div>
        {hasCategory && (
          <div className="row" data-testid="category">
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
          <div className="row">
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
                <div className="row" key={`item-${i}`}>
                  <div className="col-12 pl-0 pr-0">
                    <Reference fhirData={address} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {author && (
          <div className="row" data-testid="author">
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
      </div>
    </div>
  );
};

Goal.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Goal;
