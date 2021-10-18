import { Badge, Body, Header, Root, Title, Value } from '../../ui';

import Accordion from '../../containers/Accordion';
import Annotation from '../../datatypes/Annotation';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import HeaderIcon from '../../datatypes/HeaderIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';

const commonDTO = fhirResource => {
  const title =
    _get(fhirResource, 'vaccineCode.text') ||
    _get(fhirResource, 'vaccineCode.coding[0].display', 'Immunization');
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
  const route = _get(fhirResource, 'route.coding');
  const hasRoute = Array.isArray(route);
  const site = _get(fhirResource, 'site.coding');
  const hasSite = Array.isArray(site);
  const patient = _get(fhirResource, 'patient');
  const note = _get(fhirResource, 'note');

  return {
    title,
    status,
    providedDate,
    reported,
    manufacturerText,
    hasLotNumber,
    lotNumber,
    lotNumberExpirationDate,
    hasDoseQuantity,
    doseQuantity,
    requester,
    route,
    hasRoute,
    site,
    hasSite,
    patient,
    note,
  };
};
const dstu2DTO = fhirResource => {
  const performer = _get(fhirResource, 'performer');
  return {
    performer,
  };
};
const stu3DTO = fhirResource => {
  const performer = _get(fhirResource, 'practicioner.actor');
  return {
    performer,
  };
};

const r4DTO = fhirResource => {
  const performer = _get(fhirResource, 'performer.actor');
  const providedDate =
    _get(fhirResource, 'occurrenceDateTime') ||
    _get(fhirResource, 'occurrenceString');
  return {
    performer,
    providedDate,
  };
};

const resourceDTO = (fhirVersion, fhirResource, fhirIcons) => {
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

const Immunization = props => {
  const { fhirVersion, fhirResource } = props;

  const {
    title,
    status,
    providedDate,
    manufacturerText,
    hasLotNumber,
    lotNumber,
    lotNumberExpirationDate,
    hasDoseQuantity,
    doseQuantity,
    requester,
    performer,
    route,
    hasRoute,
    site,
    hasSite,
    patient,
    note,
  } = resourceDTO(fhirVersion, fhirResource);

  return (
    <Root name="Immunization">
      <Accordion
        headerData={
          <Header>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="fhir-resource__Procedure__header__title-segment container">
                <div className="fhir-resource__Procedure__header__title-segment__row row row-cols-2">
                  <div className="fhir-resource__Procedure__header__title-segment__icon-column col-auto p-0">
                    <div className="pt-1 px-1">
                      <HeaderIcon />
                    </div>
                  </div>
                  <div className="fhir-resource__Procedure__header__title-segment__title-column col-auto">
                    <Title data-testid="title">{title}</Title>
                    {providedDate && <Date fhirData={providedDate} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="fhir-resource__Procedure__header-right d-flex align-items-center pe-3">
              {status && <Badge data-testid="status">{status}</Badge>}
            </div>
          </Header>
        }
        bodyData={
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
            {patient && (
              <Value label="Patient" data-testid="patient">
                <Reference fhirData={patient} />
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
            {note && (
              <Value label="Note" data-testid="note">
                <Annotation fhirData={note} />
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
        }
      />
    </Root>
  );
};

Immunization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Immunization;
