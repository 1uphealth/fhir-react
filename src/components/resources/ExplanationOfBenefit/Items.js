import React from 'react';
import _get from 'lodash/get';

import {
  ValueSection,
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from '../../ui/index';
import Date from '../../datatypes/Date';
import Money from '../../datatypes/Money';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Address from '../../datatypes/CodeableConcept';
import Reference from '../../datatypes/Reference';
import Period from '../../datatypes/Period';

const Items = ({ fhirData: items = [] }) => {
  if (items.length === 0) return null;
  return (
    <ValueSection label="Items" data-testid="items" className="mt-3">
      <Table>
        <thead>
          <TableRow>
            <TableHeader />
            <TableHeader>ID</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader /*expand */>Service</TableHeader>
            <TableHeader noWordWrap>Service date</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Encounter</TableHeader>
            <TableHeader>Adjudication</TableHeader>
            <TableHeader>Net</TableHeader>
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

const Adjudication = ({ fhirData: adjudication = [] }) => {
  return adjudication.map((item, index) => {
    const category = _get(item, 'category');
    const amount = _get(item, 'amount');
    return (
      <div key={index}>
        {category && <CodeableConcept fhirData={category} />}
        {amount && <Money fhirData={amount} />}
      </div>
    );
  });
};

const Item = props => {
  const { item, parentSequences, level } = props;

  const fill = Array(level)
    .fill(null)
    .map((_, idx) => (
      <div key={idx} className="fhir-resource__Claim__item-level-fill"></div>
    ));

  const itemSequences = [...parentSequences, item.sequence];
  const id = itemSequences.join('.');

  const category = _get(item, 'category');
  const productOrService = _get(item, 'productOrService');
  const servicedDate = _get(item, 'servicedDate');
  const servicedPeriod = _get(item, 'servicedPeriod');
  const locationAddress = _get(item, 'locationAddress');
  const locationCodeableConcept = _get(item, 'locationCodeableConcept');
  const locationReference = _get(item, 'locationReference');
  const encounter = _get(item, 'encounter', []);
  const net = _get(item, 'net');
  const adjudication = _get(item, 'adjudication', []);

  const encounterArray = encounter.map(e => <Reference fhirData={e} />);

  return (
    <>
      <TableRow>
        <TableCell data-testid="items.level">
          <div className="fhir-resource__Claim__item-level">{fill}</div>
        </TableCell>
        <TableCell data-testid="items.sequence">{id}</TableCell>
        <TableCell data-testid="items.category">
          {category && <CodeableConcept fhirData={category} />}
        </TableCell>
        <TableCell data-testid="items.productOrService">
          {productOrService && <CodeableConcept fhirData={productOrService} />}
        </TableCell>
        <TableCell data-testid="items.servicedDate">
          {servicedDate && <Date fhirData={servicedDate} />}
          {servicedPeriod && <Period fhirData={servicedPeriod} />}
        </TableCell>
        <TableCell data-testid="items.location">
          {locationAddress && <Address fhirData={locationAddress} />}
          {locationCodeableConcept && (
            <CodeableConcept fhirData={locationCodeableConcept} />
          )}
          {locationReference && <Reference fhirData={locationReference} />}
        </TableCell>
        <TableCell data-testid="items.encounter">
          <Reference fhirData={encounterArray} />
        </TableCell>
        <TableCell data-testid="items.adjudication">
          {adjudication && <Adjudication fhirData={adjudication} />}
        </TableCell>
        <TableCell data-testid="items.net">
          {net && <Money fhirData={net} />}
        </TableCell>
      </TableRow>
    </>
  );
};

export default Items;
