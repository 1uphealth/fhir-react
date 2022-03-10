import React from 'react';
import _get from 'lodash/get';

import {
  ValueSection,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  MissingValue,
} from '../../ui/index';
import Date from '../../datatypes/Date';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Reference from '../../datatypes/Reference';

const Entries = ({ fhirData: items = [] }) => {
  if (items.length === 0) return null;
  return (
    <ValueSection label="Entries" data-testid="entries" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Item</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Is deleted</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {items.map((item, idx) => (
            <Entry key={idx} item={item} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const Entry = props => {
  const { item } = props;
  const flag = _get(item, 'flag');
  const deleted = _get(item, 'deleted');
  const date = _get(item, 'date');
  const entry = _get(item, 'item');

  return (
    <>
      <TableRow>
        <TableCell data-testid="items.entry">
          <Reference fhirData={entry} />
        </TableCell>
        <TableCell data-testid="items.date">
          {date ? <Date fhirData={date} isBlack /> : <MissingValue />}
        </TableCell>
        <TableCell data-testid="items.isDeleted">
          {deleted === true ? 'yes' : 'no'}
        </TableCell>
        <TableCell data-testid="items.flag">
          {flag ? <CodeableConcept fhirData={flag} /> : <MissingValue />}
        </TableCell>
      </TableRow>
    </>
  );
};

export default Entries;
