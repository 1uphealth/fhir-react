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

import './ClaimResponse.css';

import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Table,
  TableCell,
  TableHeader,
  TableRow,
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
  const items = _get(fhirResource, 'item').map(item => mapItem(item, 0));

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
    items,
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
  const items = _get(fhirResource, 'item').map(item => mapItem(item, 0));

  return {
    outcome,
    payment: {
      typeCoding: paymentTypeCoding,
      amount: paymentAmount,
      date: paymentDate,
      ref: paymentRef,
    },
    items,
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

const Item = props => {
  const { item, parentSequences, level } = props;

  const fill = Array(level)
    .fill(null)
    .map((_, idx) => (
      <div
        key={idx}
        className="fhir-resource__ClaimResponse__item-level-fill"
      ></div>
    ));

  const itemSequences = [...parentSequences, item.sequenceLinkId];
  const id = itemSequences.join('.');

  return (
    <>
      <TableRow>
        <TableCell data-testid="items.level">
          <div className="fhir-resource__ClaimResponse__item-level">{fill}</div>
        </TableCell>
        <TableCell data-testid="items.sequence">{id}</TableCell>
        <TableCell data-testid="items.adjudication">
          {item.adjudication.map((adjudication, idx) => (
            <div
              key={idx}
              data-testid="items.adjudication.singleAdjudication"
              className="fhir-resource__ClaimResponse-item-adjudication"
            >
              <div className="fhir-resource__ClaimResponse-item-adjudication-category">
                <Coding fhirData={adjudication.category} />:
              </div>
              {adjudication.amount && <Money fhirData={adjudication.amount} />}
              {adjudication.value != null && adjudication.value}
            </div>
          ))}
        </TableCell>
      </TableRow>
      {item.subItems.map((subItem, idx) => (
        <Item
          key={idx}
          item={subItem}
          level={level + 1}
          parentSequences={itemSequences}
        />
      ))}
    </>
  );
};
const Items = props => {
  const { items } = props;

  return (
    <ValueSection label="Items" data-testid="items">
      <Table>
        <thead>
          <TableRow>
            <TableHeader />
            <TableHeader>ID</TableHeader>
            <TableHeader expand>Adjudication</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <Item key={idx} item={item} level={0} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
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
  } = fhirResourceData;

  const hasItems = items.length > 0;

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
        {hasItems && <Items items={items} />}
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
