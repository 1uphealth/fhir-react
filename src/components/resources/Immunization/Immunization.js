import React from 'react';
import PropTypes from 'prop-types';

import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import _get from 'lodash/get';
import _has from 'lodash/has';
import Date from '../../datatypes/Date';

import {
  Root,
  Header,
  Title,
  Badge,
  BadgeSecondary,
  Body,
  Value,
} from '../../ui';

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
    <Root name="Immunization">
      <Header>
        <Title data-testid="title">{title}</Title>
        <Badge data-testid="status">{status}</Badge>
        <BadgeSecondary data-testid="providedDate">
          provided on <Date fhirData={providedDate} />
          {reported || ''}
        </BadgeSecondary>
      </Header>
      <Body>
        {manufacturerText && (
          <Value label="Manufacturer Text">{manufacturerText}</Value>
        )}
        {hasLotNumber && (
          <Value label="Lot number" data-testid="lotNumber">
            {lotNumber}
            {lotNumberExpirationDate && (
              <span data-testid="lotNumberExpirationDate">
                {' '}
                expires on {lotNumberExpirationDate}
              </span>
            )}
          </Value>
        )}
        {hasDoseQuantity && (
          <Value label="Dosage" data-testid="doseQuantity">
            <div>
              {_get(doseQuantity, 'value')} &nbsp;
              {_get(doseQuantity, 'unit') || _get(doseQuantity, 'code')}
            </div>
          </Value>
        )}
        {requester && (
          <Value label="Requester" data-testid="requester">
            <Reference fhirData={requester} />
          </Value>
        )}
        {performer && (
          <Value label="Performer" data-testid="performer">
            <Reference fhirData={performer} />
          </Value>
        )}
        {hasRoute && (
          <Value label="Route" data-testid="route">
            {route.map((coding, i) => {
              return (
                <div key={`item-${i}`}>
                  <Coding fhirData={coding} />
                </div>
              );
            })}
          </Value>
        )}
        {hasSite && (
          <Value label="Site" data-testid="site">
            {site.map((coding, i) => {
              return (
                <div key={`item-${i}`}>
                  <Coding fhirData={coding} />
                </div>
              );
            })}
          </Value>
        )}
      </Body>
    </Root>
  );
};

Immunization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Immunization;
