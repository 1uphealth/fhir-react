import React from 'react';
import PropTypes from 'prop-types';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import _has from 'lodash/has';
import Date from '../../datatypes/Date';

const Immunization = props => {
  const { fhirResource } = props;

  const title =
    _get(fhirResource, 'vaccineCode.text') ||
    _get(fhirResource, 'vaccineCode.coding[0].display', '');
  const status = _get(fhirResource, 'status', null);
  const providedDate = _get(fhirResource, 'date', null);
  const reported = _get(fhirResource, 'reported') && ' - self reported';
  const manufacturerText = _get(fhirResource, 'manufacturer.display');
  const hasLotNumber = _has(fhirResource, 'lotNumber');
  const lotNumber = _get(fhirResource, 'lotNumber');
  const lotNumberExpirationDate = _get(fhirResource, 'expirationDate');
  const hasDoseQuantity = _has(fhirResource, 'doseQuantity');
  const doseQuantity = _get(fhirResource, 'doseQuantity');
  const requester = _get(fhirResource, 'requester');
  const performer = _get(fhirResource, 'performer');
  const route = _get(fhirResource, 'route.coding');
  const hasRoute = Array.isArray(route);
  const site = _get(fhirResource, 'site.coding');
  const hasSite = Array.isArray(site);
  return (
    <div>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <h4 style={{ display: 'inline-block' }} data-testid="title">
          {title}
        </h4>
        (
        <span className="text-muted" data-testid="providedDate">
          status {status} provided on <Date fhirData={providedDate} />
        </span>
        <span>{reported}</span>)
      </div>
      {manufacturerText && <div className="row">{manufacturerText}</div>}
      {hasLotNumber && (
        <>
          <label className="sb-heading">Lot number</label>
          <div>
            <span data-testid="lotNumber">{lotNumber}</span>
            {lotNumberExpirationDate && (
              <span data-testid="lotNumberExpirationDate">
                {' '}
                expires on {lotNumberExpirationDate}
              </span>
            )}
          </div>
        </>
      )}
      {hasDoseQuantity && (
        <div data-testid="doseQuantity">
          <label className="sb-heading">Dosage</label>
          <div>
            {_get(doseQuantity, 'value')} &nbsp;
            {_get(doseQuantity, 'unit') || _get(doseQuantity, 'code')}
          </div>
        </div>
      )}
      {requester && (
        <div data-testid="requester">
          <label className="sb-heading">Requester</label>
          <div className="col-12 pl-0 pr-0">
            <Reference fhirData={requester} />
          </div>
        </div>
      )}
      {performer && (
        <div data-testid="performer">
          <label className="sb-heading">Performer</label>
          <div className="col-12 pl-0 pr-0">
            <Reference fhirData={performer} />
          </div>
        </div>
      )}
      {hasRoute && (
        <div data-testid="route">
          <label className="sb-heading">Route</label>
          {route.map((coding, i) => {
            return (
              <div key={`item-${i}`}>
                <Coding fhirData={coding} />
              </div>
            );
          })}
        </div>
      )}
      {hasSite && (
        <div data-testid="site">
          <label className="sb-heading">Site</label>
          {site.map((coding, i) => {
            return (
              <div key={`item-${i}`}>
                <Coding fhirData={coding} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Immunization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Immunization;
