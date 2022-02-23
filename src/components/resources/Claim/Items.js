import { Table, TableHeader, TableRow, ValueSection } from '../../ui';
import React from 'react';
import Item from './Item';

const Items = ({ items }) => {
  return (
    <ValueSection label="Items" data-testid="items" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Service</TableHeader>
            <TableHeader>Unit price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {items.map((item, idx) => (
            <Item key={idx} item={item} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default Items;
