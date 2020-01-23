import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Identifier from '../../datatypes/Identifier';
import Money from '../../datatypes/Money';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';

import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Title,
  Value,
  ValueSection,
} from '../../ui';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const created = _get(fhirResource, 'created');
  const disposition = _get(fhirResource, 'disposition');
  const requestReference = _get(fhirResource, 'request');
  const totalCost = _get(fhirResource, 'totalCost');
  const totalBenefit = _get(fhirResource, 'totalBenefit');

  return {
    id,
    created,
    disposition,
    requestReference,
    totalCost,
    totalBenefit,
  };
};

const dstu2DTO = fhirResource => {
  const outcome = _get(fhirResource, 'outcome');
  const paymentTypeCoding = null;
  const paymentAmount = _get(fhirResource, 'paymentAmount');
  const paymentDate = _get(fhirResource, 'paymentDate');
  const paymentRef = _get(fhirResource, 'paymentRef');

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
  };
};

const stu3DTO = fhirResource => {
  const outcome =
    _get(fhirResource, 'outcome.coding[0].display') ||
    _get(fhirResource, 'outcome.coding[0].code');
  const paymentTypeCoding = _get(fhirResource, 'payment.type.coding[0]');
  const paymentAmount = _get(fhirResource, 'payment.amount');
  const paymentDate = _get(fhirResource, 'payment.date');
  const paymentRef = _get(fhirResource, 'payment.identifier');

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
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
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const ClaimResponse = props => {
  const { fhirVersion, fhirResource } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="ClaimResponse" />;
  }

  const {
    id,
    outcome,
    created,
    disposition,
    requestReference,
    totalCost,
    totalBenefit,
    payment,
  } = fhirResourceData;

  return (
    <Root name="ClaimResponse">
      <Header>
        <Title>Claim response #{id}</Title>
        {outcome && <Badge data-testid="outcome">{outcome}</Badge>}
      </Header>
      <Body>
        {created && (
          <Value label="Created At" data-testid="created">
            <DateType fhirData={created} />
          </Value>
        )}
        {requestReference && (
          <Value label="Request claim" data-testid="request">
            <Reference fhirData={requestReference} />
          </Value>
        )}
        {disposition && (
          <Value label="Disposition" data-testid="disposition">
            {disposition}
          </Value>
        )}
        {totalCost && (
          <Value label="Total cost" data-testid="totalCost">
            <Money fhirData={totalCost} />
          </Value>
        )}
        {totalBenefit && (
          <Value label="Total benefit" data-testid="totalBenefit">
            <Money fhirData={totalBenefit} />
          </Value>
        )}
        <ValueSection label="Payment">
          <Value label="Type" data-testid="payment.type">
            {payment.typeCoding ? (
              <Coding fhirData={payment.typeCoding} />
            ) : (
              <MissingValue />
            )}
          </Value>
          <Value label="Amount" data-testid="payment.amount">
            {payment.amount ? (
              <Money fhirData={payment.amount} />
            ) : (
              <MissingValue />
            )}
          </Value>
          <Value label="Date" data-testid="payment.date">
            {payment.date ? (
              <DateType fhirData={payment.date} />
            ) : (
              <MissingValue />
            )}
          </Value>
          <Value label="Reference" data-testid="payment.ref">
            {payment.ref ? (
              <Identifier fhirData={payment.ref} />
            ) : (
              <MissingValue />
            )}
          </Value>
        </ValueSection>
      </Body>
    </Root>
  );
};

ClaimResponse.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default ClaimResponse;
