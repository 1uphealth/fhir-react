import { Badge, Body, Header, Root } from '../../ui';

import Accordion from '../../containers/Accordion';
import Annotation from '../../datatypes/Annotation';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import _get from 'lodash/get';
import _has from 'lodash/has';
import fhirVersions from '../fhirResourceVersions';
import { Value } from '../../ui';
import { getResourceDate } from '../../../utils/getResourceDate';

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

const Immunization = ({
  fhirVersion,
  fhirResource,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
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

  const tableData = [
    {
      label: 'Manufacturer Text',
      testId: '',
      data: manufacturerText,
      status: manufacturerText,
    },
    {
      label: 'Manufacturer Text',
      testId: 'lotNumber',
      data: (
        <>
          {lotNumber}
          {lotNumberExpirationDate && (
            <span>
              {' '}
              expires on{' '}
              <Date
                testId="lotNumberExpirationDate"
                fhirData={lotNumberExpirationDate}
                isBlack
              />
            </span>
          )}
        </>
      ),
      status: hasLotNumber,
    },
    {
      label: 'Dosage',
      testId: 'doseQuantity',
      data:
        doseQuantity &&
        [
          _get(doseQuantity, 'value'),
          _get(doseQuantity, 'unit') || _get(doseQuantity, 'code'),
        ].join(' '),
      status: hasDoseQuantity,
    },
    {
      label: 'Patient',
      testId: 'patient',
      data: patient && <Reference fhirData={patient} />,
      status: patient,
    },
    {
      label: 'Requester',
      testId: 'requester',
      data: requester && <Reference fhirData={requester} />,
      status: requester,
    },
    {
      label: 'Performer',
      testId: 'performer',
      data: performer && <Reference fhirData={performer} />,
      status: performer,
    },
    {
      label: 'Note',
      testId: 'note',
      data: note && <Annotation fhirData={note} />,
      status: note,
    },
    {
      label: 'Route',
      testId: 'route',
      data: hasRoute && route && (
        <>
          {route.map((coding, i) => {
            return (
              <div key={`item-${i}`}>
                <Coding fhirData={coding} />
              </div>
            );
          })}
        </>
      ),
      status: hasRoute,
    },
    {
      label: 'Site',
      testId: 'site',
      data: hasSite && site && (
        <>
          {site.map((coding, i) => {
            return (
              <div key={`item-${i}`}>
                <Coding fhirData={coding} />
              </div>
            );
          })}
        </>
      ),
      status: hasSite,
    },
  ];

  const immunizationDatesPaths = ['occurrenceDateTime'];

  const headerDate =
    getResourceDate(fhirResource, immunizationDatesPaths) || providedDate;

  return (
    <Root name="Immunization">
      <Accordion
        headerContent={
          <Header
            resourceName="Immunization"
            additionalContent={
              headerDate && (
                <Value label="Start date" data-testid="headerStartDate">
                  <Date fhirData={headerDate} isBlack />
                </Value>
              )
            }
            badges={status && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
            title={title}
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

Immunization.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Immunization;
