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
  ValueSection,
  BadgeSecondary,
  ValueSectionItem,
} from '../../ui';
import Accordion from '../../containers/Accordion';

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
    const sequenceLinkId = _get(addedItem, 'itemSequence.0');
    const service = _get(addedItem, 'productOrService.coding[0]');
    const fee = _get(addedItem, 'net');
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

const ClaimResponse = ({ fhirVersion, fhirResource, fhirIcons }) => {
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

  const tableData = [
    {
      label: 'Created At',
      testId: 'created',
      data: created && <DateType fhirData={created} />,
      status: created,
    },
    {
      label: 'Request claim',
      testId: 'request',
      data: requestReference && <Reference fhirData={requestReference} />,
      status: requestReference,
    },
    {
      label: 'Disposition',
      testId: 'disposition',
      data: disposition,
      status: disposition,
    },
    {
      label: 'Total cost',
      testId: 'totalCost',
      data: totalCost && <Money fhirData={totalCost} />,
      status: totalCost,
    },
    {
      label: 'Total benefit',
      testId: 'totalBenefit',
      data: totalBenefit && <Money fhirData={totalBenefit} />,
      status: totalBenefit,
    },
  ];

  const paymentData = [
    {
      label: 'Type',
      testId: 'payment.type',
      data: payment.typeCoding ? (
        <Coding fhirData={payment.typeCoding} />
      ) : (
        <MissingValue />
      ),
      status: payment.typeCoding,
    },
    {
      label: 'Amount',
      testId: 'payment.amount',
      data: payment.amount ? (
        <Money fhirData={payment.amount} />
      ) : (
        <MissingValue />
      ),
      status: payment.amount,
    },
    {
      label: 'Date',
      testId: 'payment.date',
      data: payment.date ? (
        <DateType fhirData={payment.date} />
      ) : (
        <MissingValue />
      ),
      status: payment.date,
    },
    {
      label: 'Reference',
      testId: 'payment.ref',
      data: payment.ref ? (
        <Identifier fhirData={payment.ref} />
      ) : (
        <MissingValue />
      ),
      status: payment.ref,
    },
  ];

  return (
    <Root name="ClaimResponse">
      <Accordion
        headerContent={
          <Header
            resourceName="ClaimResponse"
            title={`Claim response #${id}`}
            badges={
              <>
                {outcome && <Badge data-testid="outcome">{outcome}</Badge>}
                {status && (
                  <BadgeSecondary data-testid="status">{status}</BadgeSecondary>
                )}
              </>
            }
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {isNotEmptyArray(totalCostsArr) && (
              <ValueSection label="Total" data-testid="totalSection" marginTop>
                {totalCostsArr.map(
                  ({ category, amount }, i) =>
                    category && (
                      <ValueSectionItem
                        label={category}
                        key={`total-value-${i}`}
                      >
                        <Money fhirData={amount} />
                      </ValueSectionItem>
                    ),
                )}
              </ValueSection>
            )}
            {hasPayment && (
              <ValueSection
                label="Payment"
                data-testid="paymentSection"
                marginTop
              >
                {paymentData.map(
                  (item, index) =>
                    item.status && (
                      <ValueSectionItem
                        key={`payment-item-${index}`}
                        label={item.label}
                        data-testid={item.testId}
                      >
                        {item.data}
                      </ValueSectionItem>
                    ),
                )}
              </ValueSection>
            )}
            {hasAddedItems && <AddedItems addedItems={addedItems} />}
            {hasItems && <Items items={items} />}
          </Body>
        }
      />
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
