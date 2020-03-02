import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { isNotEmptyArray } from '../../../utils';

import fhirVersions from '../fhirResourceVersions';
import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Identifier from '../../datatypes/Identifier';
import Money from '../../datatypes/Money';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Items from './Items';
import AddedItems from './AddedItems';

import './ClaimResponse.css';

import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Title,
  Value,
  ValueSection,
  BadgeSecondary,
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

  function mapAdjudication(adjudication) {
    const category = _get(adjudication, 'code');
    const amount = _get(adjudication, 'amount');
    const value = _get(adjudication, 'value');
    return { category, amount, value };
  }
  function mapItem(item, level) {
    const sequenceLinkId = _get(item, 'sequenceLinkId');
    const adjudication = _get(item, 'adjudication', []).map(mapAdjudication);

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, adjudication, subItems };
  }
  function mapAddedItem(addedItem, level) {
    const sequenceLinkId = _get(addedItem, 'sequenceLinkId');
    const service = _get(addedItem, 'service');
    const fee = _get(addedItem, 'fee');
    const adjudication = _get(addedItem, 'adjudication', []).map(
      mapAdjudication,
    );

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(addedItem, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, service, fee, adjudication, subItems };
  }
  const items = _get(fhirResource, 'item', []).map(item => mapItem(item, 0));
  const addedItems = _get(fhirResource, 'addItem', []).map(item =>
    mapAddedItem(item, 0),
  );

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
    items,
    addedItems,
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
  const status = _get(fhirResource, 'status');

  function mapAdjudication(adjudication) {
    const category = _get(adjudication, 'category.coding[0]');
    const amount = _get(adjudication, 'amount');
    const value = _get(adjudication, 'value');
    return { category, amount, value };
  }
  function mapItem(item, level) {
    const sequenceLinkId = _get(item, 'sequenceLinkId');
    const adjudication = _get(item, 'adjudication', []).map(mapAdjudication);

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, adjudication, subItems };
  }
  function mapAddedItem(addedItem, level) {
    const sequenceLinkId = _get(addedItem, 'sequenceLinkId');
    const service = _get(addedItem, 'service.coding[0]');
    const fee = _get(addedItem, 'fee');
    const adjudication = _get(addedItem, 'adjudication', []).map(
      mapAdjudication,
    );

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(addedItem, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, service, fee, adjudication, subItems };
  }
  const items = _get(fhirResource, 'item', []).map(item => mapItem(item, 0));
  const addedItems = _get(fhirResource, 'addItem', []).map(item =>
    mapAddedItem(item, 0),
  );

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
    items,
    addedItems,
    status,
  };
};

const r4DTO = fhirResource => {
  const outcome =
    _get(fhirResource, 'outcome.coding[0].display') ||
    _get(fhirResource, 'outcome.coding[0].code');
  const paymentTypeCoding = _get(fhirResource, 'payment.type.coding[0]');
  const paymentAmount = _get(fhirResource, 'payment.amount');
  const paymentDate = _get(fhirResource, 'payment.date');
  const paymentRef = _get(fhirResource, 'payment.identifier');
  const status = _get(fhirResource, 'status');
  const totalCostsArr = _get(fhirResource, 'total', []).map(item => ({
    category:
      _get(item, 'category.coding[0].code') || _get(item, 'category.text'),
    amount: item.amount,
  }));

  function mapAdjudication(adjudication) {
    const category = _get(adjudication, 'category.coding[0]');
    const amount = _get(adjudication, 'amount');
    const value = _get(adjudication, 'value');
    return { category, amount, value };
  }
  function mapItem(item, level) {
    const sequenceLinkId =
      _get(item, 'itemSequence') || _get(item, 'detailSequence');
    const adjudication = _get(item, 'adjudication', []).map(mapAdjudication);

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, adjudication, subItems };
  }
  function mapAddedItem(addedItem, level) {
    const sequenceLinkId = _get(addedItem, 'itemSequence');
    const service = _get(addedItem, 'service.coding[0]');
    const fee = _get(addedItem, 'fee');
    const adjudication = _get(addedItem, 'adjudication', []).map(
      mapAdjudication,
    );

    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';

    const subItems = subItemProperty
      ? _get(addedItem, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequenceLinkId, service, fee, adjudication, subItems };
  }
  const items = _get(fhirResource, 'item', []).map(item => mapItem(item, 0));
  const addedItems = _get(fhirResource, 'addItem', []).map(item =>
    mapAddedItem(item, 0),
  );

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
    items,
    addedItems,
    totalCostsArr,
    status,
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

// Is any of payment fields not empty
const hasPaymentInfo = payment => {
  return Object.values(payment).filter(item => item).length > 0;
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
    items,
    addedItems,
    totalCostsArr,
    status,
  } = fhirResourceData;

  const hasItems = items.length > 0;
  const hasAddedItems = addedItems.length > 0;
  const hasPayment = hasPaymentInfo(payment);

  return (
    <Root name="ClaimResponse">
      <Header>
        <Title>Claim response #{id}</Title>
        {outcome && <Badge data-testid="outcome">{outcome}</Badge>}
        {status && (
          <BadgeSecondary data-testid="status">{status}</BadgeSecondary>
        )}
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
        {isNotEmptyArray(totalCostsArr) && (
          <ValueSection label="Total" data-testid="totalSection">
            {totalCostsArr.map(
              ({ category, amount }, i) =>
                category && (
                  <Value label={category} key={`total-value-${i}`}>
                    <Money fhirData={amount} />
                  </Value>
                ),
            )}
          </ValueSection>
        )}
        {hasPayment && (
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
        )}
        {hasAddedItems && <AddedItems addedItems={addedItems} />}
        {hasItems && <Items items={items} />}
      </Body>
    </Root>
  );
};

ClaimResponse.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default ClaimResponse;
